export const formatTimeElapsed = (seconds: number): string => {
  let minutes = Math.floor(seconds / 60);
  seconds -= (minutes * 60);

  let minString = String(minutes < 10 ? '0' + minutes : minutes);
  let secString = String(seconds < 10 ? '0' + seconds : seconds);

  return minString + ':' + secString;
};