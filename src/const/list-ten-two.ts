/* eslint-disable @typescript-eslint/no-shadow */
import {chooseState} from '../infrastructure/choose-satate/choose-state';
import {createBinaryString} from '../infrastructure/create-binary-string/create-sinary-string';
import {colors} from './colors';
import {states} from './states';

export function listTenTwo(jsonFromServer: any, tenValues: string = '{}') {
  const parsedTenValues = JSON.parse(tenValues); // Парсим строку в объект
  const listTenTwo = Object.keys(parsedTenValues).map(key => {
    // Извлекаем id из ключа, сохраняем 'R' если оно есть
    const id = key.startsWith('R') ? key : key.replace('Ten', '');

    const soTSValue = parsedTenValues[key];

    return {
      id: id,
      isError: chooseState(
        createBinaryString(jsonFromServer?.so_TS_ST[soTSValue]),
        states.Error,
      )
        ? colors.red
        : '#333334',
      isRepair: chooseState(
        createBinaryString(jsonFromServer?.so_TS_ST[soTSValue]),
        states.mdRep,
      )
        ? colors.blue
        : '#333334',
      isActive: chooseState(
        createBinaryString(jsonFromServer?.so_TS_ST[soTSValue]),
        states.sOn,
      )
        ? ['#67E761', colors.green]
        : [colors.gray, colors.gray],
      width: '48%',
    };
  });
  return listTenTwo.reverse();
}
