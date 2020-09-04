export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const timeoutTimer = setTimeout(() => {
      reject(new Error('loading image time out'));
    }, 1000);

    window.api.send('toMain', 'HI');
    img.src = src;
    img.onload = () => {
      resolve(img);
      clearTimeout(timeoutTimer);
    };
  });
}

export function drawRectangle(props, ctx) {
  const {
    left, top, width, height, color,
  } = props;

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.rect(left, top, width, height);
  ctx.stroke();
}
