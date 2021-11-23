export function validateImageUrl(url) {
  return url.match(/^https?:\/\/.+\/.+$/);
}

export function doesImageExist(url) {
  return new Promise((resolve) => {
    const img = new Image();

    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
}
