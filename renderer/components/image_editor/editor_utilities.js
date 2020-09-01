export default function loadImage(src) {
  return new Promise((resolve, reject) => {
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
}
