import React, {
  useEffect,
  useRef,
  useState,
  useReducer,
} from 'react';
import { useHistory } from 'react-router-dom';

import { loadImage, drawTagRectangle, drawPreviewingRectangle } from './editor_utils';

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
  // alignItems: 'center',
  padding: '5px',
};

const historyReducer = function (state, [type, payload, properties]) {
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
        snapshot: payload,
        properties,
      }];
    default:
      return state;
  }
};

const initialPoint = { left: -1, top: -1 };

const defaultTag = {
  name: 'test',
  color: '#fdbc40',
  description: '',
};

export default function imageEditor({ page, store, closePage }) {
  const canvasRef = useRef(null);
  const routeHistory = useHistory();
  const [currentTag, setCurrentTag] = useState(defaultTag);
  const [image, setImage] = useState(null);
  const [history, dispatch] = useReducer(historyReducer, store.getStore(page.routingPath) || []);
  const [content, setContent] = useState(<div>loading</div>);
  const [mouseDownPoint, setMouseDownPoint] = useState(initialPoint);
  const [currentMousePoint, setCurrentMousePoint] = useState(initialPoint);
  const [mouseUpPoint, setMouseUpPoint] = useState(initialPoint);
  const dpi = window.devicePixelRatio;
  // console.log('image page');
  const getLastRecord = () => (history[history.length - 1]);

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
      <>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={
            width < height + 50
              ? { ...baseStyle, height: '100%' }
              : { ...baseStyle, width: '100%' }
          }
          onMouseDown={(e) => onMouseDown(e)}
          onMouseUp={(e) => onMouseUp(e)}
        />
      </>
    );

    const drawSnapshot = () => {
      setContent(
        createCanvas(
          getLastRecord().snapshot.width,
          getLastRecord().snapshot.height,
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
          console.log('loading image error');
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
        context.putImageData(getLastRecord().snapshot, 0, 0);
      } else {
        const width = image.naturalWidth * dpi;
        const height = image.naturalHeight * dpi;
        context.drawImage(image, 0, 0, width, height);

        dispatch([
          'draw-image',
          context.getImageData(0, 0, width, height),
          { path: page.props.imagePath },
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

      // Refresh to last snapshot
      const returnToLastRecord = () => {
        context.putImageData(getLastRecord().snapshot, 0, 0);
      };

      const checkPoint = (point) => (point.left !== -1 && point.top !== -1);

      if (checkPoint(mouseDownPoint) && content !== null) {
        if (checkPoint(mouseUpPoint)) {
          returnToLastRecord();
          drawTagRectangle({
            left: mouseDownPoint.left * scale().scaleX,
            top: mouseDownPoint.top * scale().scaleY,
            width: (mouseUpPoint.left - mouseDownPoint.left) * scale().scaleX,
            height: (mouseUpPoint.top - mouseDownPoint.top) * scale().scaleY,
            color: currentTag.color,
          }, context, canvas.width, canvas.height, dispatch);
        } else if (checkPoint(currentMousePoint)) {
          returnToLastRecord();
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
      <div>
        <Labels setCurrentTag={setCurrentTag} />
        <Record history={history} />
      </div>
    </div>
  );
}
