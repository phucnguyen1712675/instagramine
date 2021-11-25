import dateFormat from 'dateformat';
import moment from 'moment';

export function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
    : Math.sign(num) * Math.abs(num);
}

export function socialLinkFormatter(socialLink) {
  return socialLink.replace('https://', 'www.');
}

function getDiffDays(date1, date2 = Date.now()) {
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function formatPostDate(timestamp) {
  const convertedDate = new Date(timestamp * 1000);
  const diffDays = getDiffDays(convertedDate);

  if (diffDays > 7) {
    const formattedDate = dateFormat(convertedDate, 'ddd, dd mmmm yyyy');
    return formattedDate;
  }
  const timeAgo = moment(convertedDate).fromNow();
  return timeAgo;
}
