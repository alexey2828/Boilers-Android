import {useEffect, useState} from 'react';
import MQTT from 'sp-react-native-mqtt';
import { ServerInit } from '../../const/user-init';
import { Alert, AsyncStorage } from 'react-native';

type UseMqttPublish = {
  error: Error | null;
  publishData: (topic: string, message: string) => void;
  password?: string;
  userName?: string;
  clientId?: string;
};

const auth = {
  clientId: `asumq${Math.random() * 100}`,
  userName: 'asumq',
  password: 'Kj89Bvtgy%35GHlbB89(YS&vgvCA<',
};

export function MqttPublisher(): UseMqttPublish {
  const [error, setError] = useState<any>();
  const [uri, setUri] = useState<string>('mqtt://191.101.2.61:1883'); // Укажите URI брокера MQTT здесь
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
  const publishData: UseMqttPublish['publishData'] = (
    topic: string,
    message: string,
  ) => {
    MQTT.createClient({
      uri: uri,
      clientId: auth.clientId,
      auth: true,
      user: auth.userName,
      pass: auth.password,
    })
      .then(function (client) {
        client.on('closed', function () {
          console.log('mqtt.event.closed');
        });

        client.on('error', function (msg) {
          console.log('mqtt.event.error', msg);
          setError(msg);
        });

        client.on('connect', function () {
          console.log('connected');
          client.subscribe(topic, 0);
          client.publish(
            'Heater/' + boilerCode?.boilerCode + '/arm',
            message,
            0,
            false,
          );
        });

        client.connect();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return {error, publishData};
}
