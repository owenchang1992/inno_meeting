import React, { useEffect, useRef } from 'react';

export default function imageViewer({ imagePath }) {
  const canvasRef = useRef(null);
  const dpi = window.devicePixelRatio;

  const loadImage = (src) => new Promise((resolve, reject) => {
    const img = new Image();
    const timeoutTimer = setTimeout(() => {
      reject(new Error('loading image time out'));
    }, 1000);

    img.src = src;
    img.onload = () => {
      resolve(img);
      clearTimeout(timeoutTimer);
    };
  });

  const drawImage = (path, canvas, ctx) => loadImage(path)
    .then((img) => {
      const width = img.naturalWidth * dpi;
      const height = img.naturalHeight * dpi;
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      ctx.drawImage(img, 0, 0, width, height);
    })
    .catch(() => console.log('loading image error'));

  const drawRectangle = (ctx) => {
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.rect(20, 20, 150, 100);
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    drawImage(imagePath, canvas, context)
      .then(() => drawRectangle(context));
  }, [imagePath]);

  return (
    <div id="canvas-container" style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100%' }} />
    </div>
  );
}
