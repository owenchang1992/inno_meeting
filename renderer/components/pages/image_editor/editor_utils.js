const URL = require('url');
const path = require('path');

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const timeoutTimer = setTimeout(() => {
      reject(new Error('loading image time out'));
    }, 1000);

    // window.api.send('toMain', 'HI');

    img.src = URL.format({
      pathname: path.resolve(window.api.getHomeDir(), src),
      protocol: 'file:',
      slashes: true,
    });

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

export function fillRectangle(props, ctx) {
  const {
    left, top, width, height, color,
  } = props;

  ctx.fillStyle = color;
  ctx.fillRect(left, top, width, height);
}
