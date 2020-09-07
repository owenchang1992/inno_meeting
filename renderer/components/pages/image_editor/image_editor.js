import React, { useEffect, useRef, useState } from 'react';
import { loadImage, drawRectangle } from './editor_utils';

const baseStyle = {
  borderRadius: '4px',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
};

export default function imageEditor({ imagePath }) {
  const canvasRef = useRef(null);
  const [canvasStyle, setCanvasStyle] = useState({ width: '100%' });
  const [mouseDownPoint, setMouseDownPoint] = useState({ left: 23, top: 56 });
  const dpi = window.devicePixelRatio;
  console.log('iamge page');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const drawImage = (path, imgCanvas, ctx) => loadImage(path)
      .then((img) => {
        if (img.naturalWidth < img.naturalHeight + 25) {
          setCanvasStyle({
            ...baseStyle,
            height: 'calc(100%)',
          });
        } else {
          setCanvasStyle({
            ...baseStyle,
            width: '100%',
          });
        }
        const width = img.naturalWidth * dpi;
        const height = img.naturalHeight * dpi;
        imgCanvas.setAttribute('width', width);
        imgCanvas.setAttribute('height', height);
        ctx.drawImage(img, 0, 0, width, height);
      })
      .catch(() => console.log('loading image error'));

    drawImage(imagePath, canvas, context);
  }, [imagePath]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const scale = () => ({
      scaleX: canvas.width / context.canvas.offsetWidth,
      scaleY: canvas.height / context.canvas.offsetHeight,
    });

    drawRectangle({
      left: mouseDownPoint.left * scale().scaleX,
      top: mouseDownPoint.top * scale().scaleY,
      width: 400,
      height: 300,
      color: 'red',
    }, canvas, context);
  }, [mouseDownPoint]);

  const onMouseDown = (e) => {
    if (e.type === 'mousedown') {
      setMouseDownPoint({
        left: e.nativeEvent.offsetX,
        top: e.nativeEvent.offsetY,
      });
    }
  };

  return (
    <div
      id="canvas-container"
      style={{
        width: '100%',
        height: 'calc(100% - 25px)',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        padding: '5px',
      }}
    >
      <canvas
        ref={canvasRef}
        style={canvasStyle}
        onMouseDown={(e) => onMouseDown(e)}
      />
    </div>
  );
}
