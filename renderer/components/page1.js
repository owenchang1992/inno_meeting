import React, { useEffect, useRef, useState } from 'react';

export default function imageViewer() {
  const canvasRef = useRef(null);
  const [canvasImg, setcanvasImg] = useState(null)

  const getImg = (src) => {
    const img = new Image();
    img.src = src;

    return img;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = '#000000';
    const img = getImg('67B70A8E-C389-4660-BEC3-8C39E8082287_1_105_c.jpeg');
    img.onload = () => {
      context.drawImage(img, 0, 0, img.naturalWidth, img.naturalheight);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
  );
}
