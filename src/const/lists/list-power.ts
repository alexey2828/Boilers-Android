/* eslint-disable @typescript-eslint/no-shadow */
import {checkData} from '../../infrastructure/check-data/check-data-field';
import {chooseState} from '../../infrastructure/choose-satate/choose-state';
import {createBinaryString} from '../../infrastructure/create-binary-string/create-sinary-string';

export function listPower({
  jsonFromServer,
  jsonFromServerState,
}: {
  jsonFromServer: any;
  jsonFromServerState: any;
}) {
  const listPower = [
    {
      id: 1,
      title: 'Тиск теплоносія у зворотному колекторі',
      value: checkData(jsonFromServer?.so_AI[20]),
      graph: 'P3',
      borderColor: '#E2BD19',
      isError: chooseState(
        createBinaryString(jsonFromServerState?.so_TP_ST[20]),
        31,
      ),
    },
    {
      id: 2,
      title: 'Тиск теплоносія після НЦ',
      value: checkData(jsonFromServer?.so_AI[19]),
      graph: 'P2',
      borderColor: '#E2BD19',
      isError: chooseState(
        createBinaryString(jsonFromServerState?.so_TP_ST[19]),
        31,
      ),
    },
    {
      id: 3,
      title: 'Тиск теплоносія в колекторі, що подає ',
      value: checkData(jsonFromServer?.so_AI[18]),
      graph: 'P1',
      borderColor: '#E2BD19',
      isError: chooseState(
        createBinaryString(jsonFromServerState?.so_TP_ST[18]),
        31,
      ),
    },
    {
      id: 4,
      title: 'Тиск у системі підживлення',
      value: checkData(jsonFromServer?.so_AI[21]),
      graph: 'P4',
      borderColor: '#E2BD19',
      isError: chooseState(
        createBinaryString(jsonFromServerState?.so_TP_ST[21]),
        31,
      ),
    },
  ];
  return listPower;
}
