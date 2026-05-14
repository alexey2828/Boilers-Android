/* eslint-disable no-bitwise */
export function createBinaryString(nMask: number) {
  for (
    var nFlag = 0, nShifted = nMask, sMask = '';
    nFlag < 32;
    nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1
  ) {}

  return sMask;
}
