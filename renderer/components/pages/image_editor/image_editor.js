import React, {
  useEffect,
  useRef,
  useState,
  useReducer,
} from 'react';
import { useHistory } from 'react-router-dom';

import {
  loadImage,
  drawTagRectangle,
  drawPreviewingRectangle,
  drawInstructions,
} from './editor_utils';

import Labels from './tags';
import Record from './records';

const baseStyle = {
  borderRadius: '4px',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
  marginRight: '5px',
};

const containerStyle = {
  width: '100%',
  height: 'calc(100% - 25px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5px',
};

const historyReducer = (state, [type, payload, properties]) => {
  switch (type) {
    case 'draw-image':
      return [...state, {
        action: type,
        snapshot: payload,
        properties,
      }];
    case 'draw-rectangle':
      return [...state, {
        action: type,
        properties: payload,
      }];
    default:
      return state;
  }
};

const initialPoint = { left: -1, top: -1 };

export default function imageEditor({ page, store, closePage }) {
  const canvasRef = useRef(null);
  const routeHistory = useHistory();
  const [currentTag, setCurrentTag] = useState({});
  const [image, setImage] = useState(null);
  const [history, dispatch] = useReducer(historyReducer, store.getStore(page.routingPath) || []);
  const [content, setContent] = useState(<div>loading</div>);
  const [mouseDownPoint, setMouseDownPoint] = useState(initialPoint);
  const [currentMousePoint, setCurrentMousePoint] = useState(initialPoint);
  const [mouseUpPoint, setMouseUpPoint] = useState(initialPoint);
  const dpi = window.devicePixelRatio;
  const getRecordImage = () => (history[0]);

  const drawRecord = (record) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawInstructions(context, history[0].snapshot, record);
  };

  // Initial content
  useEffect(() => {
    const onMouseDown = (e) => {
      setMouseUpPoint(initialPoint);
      setMouseDownPoint({
        left: e.nativeEvent.offsetX,
        top: e.nativeEvent.offsetY,
      });

      // Add mouse move event
      canvasRef.current.onmousemove = (event) => {
        setCurrentMousePoint({
          left: event.offsetX,
          top: event.offsetY,
        });
      };
    };

    const onMouseUp = (e) => {
      setMouseUpPoint({
        left: e.nativeEvent.offsetX,
        top: e.nativeEvent.offsetY,
      });

      // remove mouse move event
      canvasRef.current.onmousemove = null;
      setCurrentMousePoint(initialPoint);
    };

    const createCanvas = (width, height) => (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={
          width < height + 50
            ? { ...baseStyle, height: '100%' }
            : { ...baseStyle, width: 'calc(100% - 11em)' }
        }
        onMouseDown={(e) => onMouseDown(e)}
        onMouseUp={(e) => onMouseUp(e)}
      />
    );

    const drawSnapshot = () => {
      setContent(
        createCanvas(
          getRecordImage().snapshot.width,
          getRecordImage().snapshot.height,
        ),
      );
    };

    const drawImage = () => {
      loadImage(page.props.imagePath)
        .then((img) => {
          setImage(img);
          setContent(
            createCanvas(
              img.naturalWidth * dpi,
              img.naturalHeight * dpi,
            ),
          );
        })
        .catch(() => {
          setContent(<div>Loading Media Error</div>);
          setTimeout(() => {
            routeHistory.goBack();
            closePage(page);
          }, 1000);
        });
    };

    if (history.length > 0) drawSnapshot();
    else drawImage();
  }, []);

  // Draw canvas after initialization
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (history.length > 0) {
        drawInstructions(context, history[0].snapshot, history);
      } else {
        const width = image.naturalWidth * dpi;
        const height = image.naturalHeight * dpi;
        context.drawImage(image, 0, 0, width, height);

        dispatch([
          'draw-image',
          context.getImageData(0, 0, width, height),
          {
            tag: currentTag,
            path: page.props.imagePath,
          },
        ]);
      }
    }
  }, [content, image]);

  // Cache history after history updated
  useEffect(
    () => store.addStore({
      name: page.routingPath,
      content: history,
    }), [history],
  );

  // handle mouse events
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const scale = () => ({
        scaleX: canvas.width / context.canvas.offsetWidth,
        scaleY: canvas.height / context.canvas.offsetHeight,
      });

      // Check the point isn't in initial state
      const checkPoint = (point) => (point.left !== -1 && point.top !== -1);

      // Check the scope in point1 and point2 isn't a line or a point
      const isArea = (point1, point2) => (
        point1.left !== point2.left && point1.top !== point2.top
      );

      if (checkPoint(mouseDownPoint) && content !== null) {
        if (checkPoint(mouseUpPoint)) {
          drawRecord(history);
          if (isArea(mouseDownPoint, mouseUpPoint)) {
            drawTagRectangle({
              left: mouseDownPoint.left * scale().scaleX,
              top: mouseDownPoint.top * scale().scaleY,
              width: (mouseUpPoint.left - mouseDownPoint.left) * scale().scaleX,
              height: (mouseUpPoint.top - mouseDownPoint.top) * scale().scaleY,
              color: currentTag.color,
              tag: currentTag,
            }, context, dispatch);
          }
        } else if (checkPoint(currentMousePoint)) {
          // console.log(history);
          drawRecord(history);
          drawPreviewingRectangle({
            left: mouseDownPoint.left * scale().scaleX,
            top: mouseDownPoint.top * scale().scaleY,
            width: (currentMousePoint.left - mouseDownPoint.left) * scale().scaleX,
            height: (currentMousePoint.top - mouseDownPoint.top) * scale().scaleY,
          }, context);
        }
      }
    }
  }, [mouseDownPoint, mouseUpPoint, currentMousePoint]);

  return (
    <div
      id="canvas-container"
      style={containerStyle}
    >
      { content }
      {
        content.type === 'canvas' ? (
          <div style={{ height: '100%', width: '11em' }}>
            <Labels setCurrentTag={setCurrentTag} currentTag={currentTag} />
            <Record history={history} drawRecord={drawRecord} />
          </div>
        ) : null
      }
    </div>
  );
}
