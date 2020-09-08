import React, {
  useEffect,
  useRef,
  useState,
  useReducer,
} from 'react';

import { loadImage, drawRectangle } from './editor_utils';

const baseStyle = {
  borderRadius: '4px',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
};

const historyReducer = function (state, [type, payload]) {
  switch (type) {
    case 'draw-image':
      return [...state, {
        action: type,
        snapshot: payload,
      }];
    case 'draw-rectangle':
      return [...state, {
        action: type,
        snapshot: payload,
      }];
    default:
      return state;
  }
};

export default function imageEditor({ imagePath }) {
  const canvasRef = useRef(null);
  const [history, dispatch] = useReducer(historyReducer, []);
  const [content, setContent] = useState(<div>loading</div>);
  const [mouseDownPoint, setMouseDownPoint] = useState({ left: -1, top: -1 });
  // const [currentMousePoint, setCurrentMousePoint] = useState({ left: -1, top: -1 });
  const [mouseUpPoint, setMouseUpPoint] = useState({ left: -1, top: -1 });
  const dpi = window.devicePixelRatio;
  console.log('iamge page');

  useEffect(() => {
    const onMouseDown = (e) => {
      setMouseUpPoint({
        left: -1,
        top: -1,
      });
      setMouseDownPoint({
        left: e.nativeEvent.offsetX,
        top: e.nativeEvent.offsetY,
      });
    };

    // const onMouseMove = (e) => {
    //   if (e.type === 'mousemove') {
    //     setCurrentMousePoint({
    //       left: e.nativeEvent.offsetX,
    //       top: e.nativeEvent.offsetY,
    //     });
    //   }
    // };

    const onMouseUp = (e) => {
      setMouseUpPoint({
        left: e.nativeEvent.offsetX,
        top: e.nativeEvent.offsetY,
      });
    };

    const drawImage = (path) => loadImage(path)
      .then((img) => {
        const width = img.naturalWidth * dpi;
        const height = img.naturalHeight * dpi;
        setContent(
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={
              img.naturalWidth < img.naturalHeight + 25
                ? { ...baseStyle, height: '100%' }
                : { ...baseStyle, width: '100%' }
            }
            onMouseDown={(e) => onMouseDown(e)}
            onMouseUp={(e) => onMouseUp(e)}
          />,
        );
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, width, height);
        dispatch([
          'draw-image',
          context.getImageData(0, 0, canvas.width, canvas.height),
        ]);
      })
      .catch(() => {
        console.log('loading image error');
        setContent(<div>Loading Media Error</div>);
      });

    drawImage(imagePath);
  }, []);

  useEffect(() => {
    if (content.type === 'canvas') {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const scale = () => ({
        scaleX: canvas.width / context.canvas.offsetWidth,
        scaleY: canvas.height / context.canvas.offsetHeight,
      });

      if (
        mouseDownPoint.left !== -1
        && mouseDownPoint.top !== -1
        && content !== null
        && mouseUpPoint.top !== -1
        && mouseUpPoint.left !== -1
      ) {
        context.putImageData(history[0].snapshot, 0, 0);
        drawRectangle({
          left: mouseDownPoint.left * scale().scaleX,
          top: mouseDownPoint.top * scale().scaleY,
          width: (mouseUpPoint.left - mouseDownPoint.left) * scale().scaleX,
          height: (mouseUpPoint.top - mouseDownPoint.top) * scale().scaleY,
          color: 'red',
        }, context);
        // dispatch([
        //   'draw-rectangle',
        //   JSON.stringify(context.getImageData(0, 0, canvas.width, canvas.height)),
        // ]);
      }
    }
  }, [mouseDownPoint, mouseUpPoint]);

  return (
    <div
      id="canvas-container"
      style={{
        width: '100%',
        height: 'calc(100% - 25px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px',
      }}
    >
      { content }
    </div>
  );
}
