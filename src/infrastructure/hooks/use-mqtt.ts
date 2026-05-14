/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {useEffect, useState} from 'react';
import MQTT from 'sp-react-native-mqtt';
import { ServerInit } from '../../const/user-init';
import { Alert, AsyncStorage } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseMqtt<T> = {
  msgFromServer: string;
  error: Error | null;
  onConnect: boolean;
  updateResponse: (uri: string, topic: string) => void;
  reconnectToMqtt: () => void; // Function for reconnection
  password?: string;
  userName?: string;
  clientId?: string;
  msgFromTopic1: string;
  msgFromTopic2: string;
  msgFromTopic3: string;
};
const auth = {
  clientId: `asumq${Math.random() * 100}`,
  userName: 'asumq',
  password: 'Kj89Bvtgy%35GHlbB89(YS&vgvCA<',
};

export function useMqtt<T>(): UseMqtt<T> {
  const [msgFromServer, setMsgFromServer] = useState('{}');
  const [msgFromTopic1, setMsgFromTopic1] = useState<string>('');
  const [msgFromTopic2, setMsgFromTopic2] = useState<string>('');
  const [msgFromTopic3, setMsgFromTopic3] = useState<string>('');
  const [error, setError] = useState<any>();
  const [onConnect, setOnConnect] = useState<boolean>(false);
  const [uri, setUri] = useState<string>('');
  const [topic, setTopic] = useState<any>('');

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
  const updateResponse: UseMqtt<T>['updateResponse'] = (uri: string, topic: string) => {
    setUri(uri);
    setTopic(topic);
  };

  // Function for reconnection
  const reconnectToMqtt: UseMqtt<T>['reconnectToMqtt'] = () => {
    console.log(msgFromTopic3);
  };
  useEffect(() => {
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

        client.on('message', function (msg) {
          console.log('mqtt.event.message', msg);

          // Check the topic of the message and update the state accordingly
          if (msg.topic === 'Heater/' + boilerCode?.boilerCode + '/time') {
            setMsgFromTopic1(msg.data);
          } else if (msg.topic === 'Heater/' + boilerCode?.boilerCode + '/trigger') {
            setMsgFromTopic2(msg.data);
          } else if (msg.topic === 'Heater/' + boilerCode?.boilerCode + '/settings') {
            setMsgFromTopic3(msg.data);
          }
        });

        client.on('connect', function () {
          console.log('connected');
          setOnConnect(true);

          // Subscribe to both topics
          client.subscribe('Heater/' + boilerCode?.boilerCode + '/time', 0);
          client.subscribe('Heater/' + boilerCode?.boilerCode + '/trigger', 0);
          client.subscribe('Heater/' + boilerCode?.boilerCode + '/settings', 0);
          client.publish('Heater/' + boilerCode?.boilerCode + '/arm', '{"hello": [1]}', 0, false);
        });

        client.connect();
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [uri]);

  return {msgFromServer, error, reconnectToMqtt, onConnect, updateResponse, msgFromTopic1, msgFromTopic2, msgFromTopic3 };
}