export function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
    : Math.sign(num) * Math.abs(num);
}

export function socialLinkFormatter(socialLink) {
  return socialLink.replace('https://', 'www.');
}