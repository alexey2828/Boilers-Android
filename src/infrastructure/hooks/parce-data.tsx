import {ServerInit} from '../../const/user-init';
import {useEffect, useState} from 'react';
import {useMqtt} from './use-mqtt';
import { Alert, AsyncStorage } from 'react-native';

export const ParceData = () => {
  const {
    msgFromServer: msgFromHeater209,
    error: errorFromHeater209,
    onConnect: onConnectHeater209,
    updateResponse: updateResponseHeater209,
  } = useMqtt<any>();
  const {
    msgFromServer: msgFromHeater209Time,
    error: errorFromHeater209Time,
    onConnect: onConnectHeater209Time,
    updateResponse: updateResponseHeater209Time,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useMqtt<any>();
  const [boilerCode, setBoilerCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoilerCode = async () => {
      try {
        const storedData = await AsyncStorage.getItem('boilerSettings');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setBoilerCode(parsedData);
        } else {
          Alert.alert('Нет данных', 'Не удалось найти данные для boilerCode.');
        }
      } catch (error) {
        Alert.alert('Ошибка', 'Не удалось загрузить данные.');
        console.error(error);
      }
    };

    fetchBoilerCode();
  }, []);

  // Распарсим сообщения из обоих топиков
  const jsonFromServerHeater209D = msgFromHeater209
    ? JSON.parse(msgFromHeater209)
    : null;
  const jsonFromServerHeater209TimeD = msgFromHeater209Time
    ? JSON.parse(msgFromHeater209Time)
    : null;

  const jsonFromServerHeater209 = jsonFromServerHeater209D
    ? jsonFromServerHeater209D.d
    : null;
  const jsonFromServerHeater209Time = jsonFromServerHeater209TimeD
    ? jsonFromServerHeater209TimeD.d
    : null;
  const [update, setUpdate] = useState('');

  useEffect(() => {
    setUpdate('update');
    // Подключимся к топикам Heater_209 и Heater_209_time
    updateResponseHeater209(
      ServerInit.protocol + ServerInit.host + ':' + ServerInit.port,
      'Heater/' + boilerCode?.boilerCode + '/trigger',
    );
    updateResponseHeater209Time(
      ServerInit.protocol + ServerInit.host + ':' + ServerInit.port,
      'Heater/' + boilerCode?.boilerCode + '/trigger',
    );
  }, []);

  // Возвращаем JSON-данные из компонента
  return {
    jsonFromServerHeater209,
    jsonFromServerHeater209Time,
  };
};
