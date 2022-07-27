export const convertTime = (number: number): string => {
  const mins: number = Math.floor(number / 60);
  const secs: number = Number((number % 60).toFixed());
  return `${mins < 10 ? "0" : mins}:${secs < 10 ? "0" + secs : "00"}`;
};
