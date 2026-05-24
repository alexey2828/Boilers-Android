/* eslint-disable @typescript-eslint/no-shadow */
import { chooseState } from '../infrastructure/choose-satate/choose-state';
import { createBinaryString } from '../infrastructure/create-binary-string/create-sinary-string';
import { colors } from './colors';
import { states } from './states';

export function listTenOne(jsonFromServer: any, tenValues: string = '{}') {
  const parsedTenValues = JSON.parse(tenValues); 
  const listTenOne = Object.keys(parsedTenValues).map(key => {

    const id = key.startsWith('R') ? key : key.replace('Ten', '');

    const soTSValue = parsedTenValues[key];

    return {
      id: id,
      isError: chooseState(
        createBinaryString(jsonFromServer?.so_TS_ST[soTSValue.value]),
        states.Error,
      )
        ? colors.red
        : '#333334',
      isRepair: chooseState(
        createBinaryString(jsonFromServer?.so_TS_ST[soTSValue.value]),
        states.mdRep,
      )
        ? colors.blue
        : '#333334',
      isActive: chooseState(
        createBinaryString(jsonFromServer?.so_TS_ST[soTSValue.value]),
        states.sOn,
      )
        ? ['#67E761', colors.green]
        : [colors.gray, colors.gray],
      width:
        parseFloat(soTSValue.param1) < 15
        ? `${((parseFloat(soTSValue.param1) + 2) / 15) * 48}%`
        : '48%',

    };
  });

  return listTenOne;
}
