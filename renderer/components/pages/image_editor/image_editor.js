import React, {
  useEffect,
  useRef,
  useState,
  useReducer,
  useCallback,
} from 'react';

import { useHistory } from 'react-router-dom';

import {
  loadImage,
  drawTagRectangle,
  drawPreviewingRectangle,
  drawInstructions,
  findRecordIndex,
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
  const [snapshot, setSnapshot] = useState(null);
  const [currentTag, setCurrentTag] = useState({});
  const [history, dispatch] = useReducer(historyReducer, store.getStore(page.routingPath) || []);
  const [content, setContent] = useState(<div>loading</div>);
  const [mouseDownPoint, setMouseDownPoint] = useState(initialPoint);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [currentMousePoint, setCurrentMousePoint] = useState(initialPoint);
  const [mouseUpPoint, setMouseUpPoint] = useState(initialPoint);
  const dpi = window.devicePixelRatio;

  const drawRecord = (record) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawInstructions(context, snapshot, record);
  };

  const toggleRecords = useCallback(
    (value) => {
      const index = findRecordIndex(value, selectedRecords);
      if (index === -1) {
        setSelectedRecords([...selectedRecords, value]);
      } else {
        selectedRecords.splice(index, 1);
        setSelectedRecords([...selectedRecords]);
      }
    },
  );

  const drawAllRecords = () => {
    const newRecords = [...history];
    newRecords.splice(0, 1);
    setSelectedRecords(newRecords);
  };

  useEffect(() => {
    if (history.length !== 0) {
      // drawRecord(selectedRecords);
    }
  }, [selectedRecords]);

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
      // setContent(
      //   createCanvas(
      //     getRecordImage().snapshot.width,
      //     getRecordImage().snapshot.height,
      //   ),
      // );
    };

    const drawImage = () => {
      console.log(page.props.imagePath);
      loadImage(page.props.imagePath)
        .then((img) => {
          setContent(
            createCanvas(
              img.naturalWidth * dpi,
              img.naturalHeight * dpi,
            ),
          );

          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          const width = img.naturalWidth * dpi;
          const height = img.naturalHeight * dpi;
          context.drawImage(img, 0, 0, width, height);
          setSnapshot(context.getImageData(0, 0, width, height));
        })
        .catch((err) => {
          setContent(<div>Loading Media Error</div>);
          console.log(err);
          setTimeout(() => {
            routeHistory.goBack();
            closePage(page);
          }, 1000);
        });
    };

    if (history.length > 0) drawSnapshot();
    else drawImage();
  }, []);

  // Cache history after history updated
  useEffect(() => {
    store.addStore({
      name: page.routingPath,
      content: history,
    });
    drawAllRecords();
  }, [history]);

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
              left: Math.round(mouseDownPoint.left * scale().scaleX),
              top: Math.round(mouseDownPoint.top * scale().scaleY),
              width: Math.round((mouseUpPoint.left - mouseDownPoint.left) * scale().scaleX),
              height: Math.round((mouseUpPoint.top - mouseDownPoint.top) * scale().scaleY),
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
        useCallback(content.type === 'canvas' ? (
          <div style={{ height: '100%', width: '11em' }}>
            <Labels setCurrentTag={setCurrentTag} currentTag={currentTag} />
            <Record
              history={history}
              toggleRecords={toggleRecords}
              selectedRecords={selectedRecords}
            />
          </div>
        ) : null, [history, currentTag, selectedRecords, content])
      }
    </div>
  );
}
