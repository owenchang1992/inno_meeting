import React, { useEffect, useRef, useState } from 'react';
import { loadImage, drawRectangle } from './editor_utils';

const baseStyle = {
  borderRadius: '4px',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
};

export default function imageEditor({ imagePath }) {
  const canvasRef = useRef(null);
  const [canvasStyle, setCanvasStyle] = useState({ width: '100%' });
  const [mouseDownPoint] = useState({ left: 23, top: 56 });
  const dpi = window.devicePixelRatio;

  const drawImage = (path, canvas, ctx) => loadImage(path)
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
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      ctx.drawImage(img, 0, 0, width, height);
    })
    .catch(() => console.log('loading image error'));

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    drawImage(imagePath, canvas, context)
      .then(() => drawRectangle({
        left: 60,
        top: 70,
        width: 400,
        height: 300,
        color: 'red',
      }, context));
  }, [imagePath]);

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
      <canvas ref={canvasRef} style={canvasStyle} />
    </div>
  );
}
