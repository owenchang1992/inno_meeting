import React, { useEffect, useRef, useState } from 'react';

export default function imageViewer() {
  const canvasRef = useRef(null);
  const dpi = window.devicePixelRatio;
  const [canvas]

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
  
  const drawImage = (path, canvas, ctx) => {
    return loadImage(path)
      .then((img) => {
        const width = img.naturalWidth * dpi;
        const height = img.naturalHeight * dpi;
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        ctx.drawImage(img, 0, 0, width, height);
        return 
      })
      .catch((err) => console.log('loading image error'))
  };

  const drawＲectangle = (ctx) => {
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.rect(20, 20, 150, 100);
    ctx.stroke();
  };

  const reDraw = () => {

  };

  const loadConvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    return 
  }

  useEffect(() => {
    drawＲectangle
  });

  drawImage('67B70A8E-C389-4660-BEC3-8C39E8082287_1_105_c.jpeg', )

  return (
    <div id="canvas-container" style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{width: "100%"}}/>
    </div>
  );
}
