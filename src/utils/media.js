export function validateImageUrl(url) {
  return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(url);
}

export function doesImageExist(url) {
  return new Promise((resolve) => {
    const img = new Image();

    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
}
