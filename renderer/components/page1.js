import React, { useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';

export default function imageViewer() {
  const canvasRef = useRef(null);

  const getImg = (src) => {
    const img = new Image();
    img.src = src;

    return img;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const dpi = window.devicePixelRatio;
    const context = canvas.getContext('2d');
    const elem = document.getElementById('canvas-container');
    canvas.style.width = `${elem.offsetWidth} px`;
    canvas.style.height = `${elem.offsetHeight} px`;
    canvas.setAttribute('width', elem.offsetWidth * dpi);
    canvas.setAttribute('height', elem.offsetHeight * dpi);

    const img = getImg('67B70A8E-C389-4660-BEC3-8C39E8082287_1_105_c.jpeg');
    img.onload = () => {
      const width = ((img.naturalWidth * elem.offsetWidth) / img.naturalWidth) * dpi;
      const height = ((img.naturalHeight * elem.offsetHeight) / img.naturalHeight) * dpi;
      context.drawImage(img, 0, 0, width, height);
      context.beginPath();
      context.strokeStyle = 'red';
      context.rect(20, 20, 150, 100);
      context.stroke();
    };
  }, []);

  return (
    <div id="canvas-container" style={{ width: '100%', height: '100%' }}>
      <Grid container justify="center">
        <canvas ref={canvasRef} />
      </Grid>
    </div>
  );
}
