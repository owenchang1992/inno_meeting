import React, { useEffect, useRef, useState } from 'react';
import { loadImage, drawRectangle } from './editor_utils';

const baseStyle = {
  borderRadius: '4px',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
};

export default function imageEditor({ imagePath }) {
  const canvasRef = useRef(null);
  const [content, setContent] = useState(<div>loading</div>);
  const [mouseDownPoint, setMouseDownPoint] = useState({ left: -1, top: -1 });
  const [currentMousePoint, setCurrentMousePoint] = useState({ left: -1, top: -1 });
  const dpi = window.devicePixelRatio;
  console.log('iamge page');

  useEffect(() => {
    const onMouseDown = (e) => {
      setCurrentMousePoint({
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
      setCurrentMousePoint({
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
                ? { ...baseStyle, height: 'calc(100%)' }
                : { ...baseStyle, width: '100%' }
            }
            onMouseDown={(e) => onMouseDown(e)}
            // onMouseMove={(e) => onMouseMove(e)}
            onMouseUp={(e) => onMouseUp(e)}
          />,
        );
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, width, height);
      })
      .catch(() => {
        console.log('loading image error');
        setContent(<div>Loading Media Error</div>);
      });

    drawImage(imagePath);
  }, [imagePath]);

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
        && currentMousePoint.top !== -1
        && currentMousePoint.left !== -1
      ) {
        drawRectangle({
          left: mouseDownPoint.left * scale().scaleX,
          top: mouseDownPoint.top * scale().scaleY,
          width: (currentMousePoint.left - mouseDownPoint.left) * scale().scaleX,
          height: (currentMousePoint.top - mouseDownPoint.top) * scale().scaleY,
          color: 'red',
        }, canvas, context);
      }
    }
  }, [mouseDownPoint, currentMousePoint]);

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
