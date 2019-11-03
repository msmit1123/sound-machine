export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function formatMilliseconds(milli, delimiter = ':') {
  const showLeading0 = (num) => (num < 10 ? '0' + num : num);
  const minutes = showLeading0(Math.floor((milli / (1000 * 60)) % 60));
  const seconds = showLeading0(Math.floor(milli / 1000) % 60);
  const milliseconds = showLeading0(Math.floor(milli / 10) % 100);
  return minutes + delimiter + seconds + delimiter + milliseconds;
}
