/* eslint-disable @typescript-eslint/no-shadow */
import {checkData} from '../../infrastructure/check-data/check-data-field';
import {chooseState} from '../../infrastructure/choose-satate/choose-state';
import {createBinaryString} from '../../infrastructure/create-binary-string/create-sinary-string';

export function listDegree({
  jsonFromServerState,
  schemaSensor, // Замените значение по умолчанию на пустую строку JSON
  sensorValues,
  type,
}: {
  jsonFromServerState: any;
  schemaSensor?: string | {[key: string]: {name: string; value: number}};
  sensorValues?: Record<string, any> | null;
  type: string;
}) {
  const listDegree = [];
  
  const parsedSchemaSensor =
    typeof schemaSensor === 'string' ? JSON.parse(schemaSensor) : schemaSensor;

  if (
    jsonFromServerState &&
    jsonFromServerState.so_TP_ST
  ) {
    const filteredEntries = Object.entries(parsedSchemaSensor || {})
      .filter(([key]) => key.startsWith(type))
      .sort(
        ([a], [b]) =>
          parseInt(a.replace(/\D/g, ''), 10) - parseInt(b.replace(/\D/g, ''), 10),
      );

    for (const [key, sensor] of filteredEntries as [string, any][]) {
      const {name, value} = sensor;
      const sensorId = parseInt(key.replace(/\D/g, ''), 10);
      if (Number.isNaN(sensorId)) {
        continue;
      }

      const fieldValue = Number(sensorValues?.[key]?.valueParamTMP);

      listDegree.push({
        id: sensorId,
        title: name || `Неизвестный ${key}`,
        value: checkData(Number.isNaN(fieldValue) ? undefined : fieldValue),
        graph: key,
        borderColor: '#0E92CB',
        isError: chooseState(
          createBinaryString(jsonFromServerState.so_TP_ST[value]),
          31,
        ),
      });
    }
  } else {
    console.warn(
      'Invalid jsonFromServerState or so_TP_ST not provided',
    );
  }
  return listDegree;
}
