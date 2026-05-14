export function chooseState(BunaryArrNumber: any, satateNumber: number) {
  const arr = ('' + BunaryArrNumber).split('');
  const binaryArr = arr.map(Number);
  if (binaryArr[satateNumber] === 1) {
    return true;
  } else {
    return false;
  }
}
//для sOn если на 31 числе бинарного кода будет 1 - true
