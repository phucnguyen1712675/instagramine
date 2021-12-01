import {ONERROR_IMAGE_PLACEHOLDER} from '../constants';

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

export function onErrorImage(e) {
  e.target.onerror = null;
  e.target.src = ONERROR_IMAGE_PLACEHOLDER;
}
