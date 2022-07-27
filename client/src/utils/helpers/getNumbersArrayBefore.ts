export const getNumbersArrayBefore = (lastCount: number): number[] => {
  let numbersArray: number[] = [];
  for (let i = 1; i <= lastCount; i++) {
    numbersArray.push(i);
  }
  return numbersArray;
};
