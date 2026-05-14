/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  PanResponder,
  ScrollView, AsyncStorage, Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import SwitchToggle from 'react-native-switch-toggle';
import { ShemesStyle } from './page-styles/shema.style';
import { colors } from '../../const/colors';
import { IndexStyle } from './page-styles/index.style';
import { SwitchToggleComponent } from '../switch-toggle';
import { PageMainStyle } from './page-styles/page-main.styles';
import { ShemaButton } from '../shema-btn/shema-btn';
import { states } from '../../const/states';
import { chooseState } from '../../infrastructure/choose-satate/choose-state';
import { createBinaryString } from '../../infrastructure/create-binary-string/create-sinary-string';
import { units } from '../../const/units';
import RNRestart from 'react-native-restart';
import { useNavigation, useRoute } from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from 'react-native-svg';
import { listTenOne } from '../../const/list-ten-one';
import AnimatedColorView from 'react-native-animated-colors';
import { listTenTwo } from '../../const/list-ten-two';
import { styles } from '../headerStyle.styles';
import { checkData } from '../../infrastructure/check-data/check-data-field';
import {
  addRandomSensorValuesOffset,
  formatCurrentTime,
} from '../../infrastructure/sensor-values/sensor-values';

export const MainPage: React.FC = () => {
  const jsonFromServerHeater209Time = {
    so_AI: Array(40).fill(0),
    so_power1: Array(9).fill(0),
    so_power2: Array(9).fill(0),
    controlT: [0],
    date_time: [0, 0],
  } as any;
  const jsonFromServerHeater209 = {
    TS_ComSC_General: 0,
    so_semi_aut: [0, 0, 0],
    so_aut_air: [0, 0, 0],
    so_aut_innerT: [0, 0, 0],
    so_TS_ST: [],
    so_BH: [],
    date_time: [0, 0],
  } as any;
  const jsonFromServerHeaterSettings209 = {} as any;
  const jsonFromServerHeater209D = false;
  const jsonFromServerHeater209TimeD = {} as any;
  //const jsonFromServerHeater209 = route.params?.data;
  //const jsonFromServerHeater209 = data?.d;
  const [heatingToggle, setHeatingToggle] = useState(true);
  const [accidentToggle, setAccidentToggle] = useState(true);
  const [isShemaButtonOn, setIsShemaButtonOn] = useState(true);
  const [activeScreen, setActiveScreen] = useState('Котли');
  const [boilerCode, setBoilerCode] = useState<any>(null);
  const [sensorValues, setSensorValues] = useState<Record<string, any> | null>(null);
  const [sensorValuesError, setSensorValuesError] = useState<string | null>(null);
  const [boilerIsActive, setBoilerIsActive] = useState(false);
  const [controlMode, setControlMode] = useState<number | null>(null);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(formatCurrentTime);

  const route = useRoute();

  const getSensorValue = (key: string, fallbackValue?: any) => {
    const valueParamTMP = sensorValues?.[key]?.valueParamTMP ?? sensorValues?.[key];
    const value = valueParamTMP !== undefined ? Number(valueParamTMP) : Number(fallbackValue);

    return checkData(Number.isNaN(value) ? undefined : value);
  };
  
  const [isModalVisibleStateHeat, setModalVisibleStateHeat] = useState(false);

  const toggleModalStateHeat = (): void => {
    setModalVisibleStateHeat(!isModalVisibleStateHeat);
  };

  const [isModalVisibleSettings, setModalVisibleSettings] = useState(false);

  const toggleModalSettings = (): void => {
    setModalVisibleSettings(!isModalVisibleSettings);
  };
  
  const [isModalVisibleModeSettings, setModalVisibleModeSettings] = useState(false);

  const toggleModalModeSettings = (): void => {
    setModalVisibleModeSettings(!isModalVisibleModeSettings);
  };

  const [isModalVisibleConfirm, setModalVisibleConfirm] = useState(false);

  const toggleModalConfirm = (): void => {
    setModalVisibleConfirm(!isModalVisibleConfirm);
  };

  const [isModalVisibleConfirm2, setModalVisibleConfirm2] = useState(false);

  const toggleModalConfirm2 = (): void => {
    setModalVisibleConfirm2(!isModalVisibleConfirm2);
  };

  const [isModalVisibleConfirm3, setModalVisibleConfirm3] = useState(false);

  const toggleModalConfirm3 = (): void => {
    setModalVisibleConfirm3(!isModalVisibleConfirm3);
  };

  const [isModalVisibleConfirm4, setModalVisibleConfirm4] = useState(false);

  const toggleModalConfirm4 = (): void => {
    setModalVisibleConfirm4(!isModalVisibleConfirm4);
  };

  const [isModalVisibleSoTen, setModalVisibleSoTen] = useState(false);

  const toggleModalSoTen = (): void => {
    setModalVisibleSoTen(!isModalVisibleSoTen);
  };

  const [isModalVisibleSoWeekPik, setModalVisibleSoWeekPik] = useState(false);

  const toggleModalSoWeekPik = (): void => {
    setModalVisibleSoWeekPik(!isModalVisibleSoWeekPik);
  };

  const [isModalVisibleTenOne, setModalVisibleTenOne] = useState(false);

  const toggleModalTenOne = (): void => {
    setModalVisibleTenOne(!isModalVisibleTenOne);
  };

  const [isModalVisibleTenTwo, setModalVisibleTenTwo] = useState(false);

  const toggleModalTenTwo = (): void => {
    setModalVisibleTenTwo(!isModalVisibleTenTwo);
  };

  const [isModalVisibleTenOne_, setModalVisibleTenOne_] = useState(false);

  const toggleModalTenOne_ = (): void => {
    setModalVisibleTenOne_(!isModalVisibleTenOne_);
  };

const listIndicators = [
  {
    id: 1,
    title: 'T14 Повітря, ' + units.degrees,
    value: getSensorValue('T14', jsonFromServerHeater209Time?.so_AI[13]),
    graph: 'T14',
  },
  {
    id: 2,
    title: 'Різниця T5 - T12, ' + units.degrees,
    value: checkData(
      Number(getSensorValue('T5', jsonFromServerHeater209Time?.so_AI[5])) -
      Number(getSensorValue('T12', jsonFromServerHeater209Time?.so_AI[12])),
    ),
    graph: 'T5_T12',
  },
  {
    id: 3,
    title: 'Різниця P2 - P3, ' + units.pressure,
    value: checkData(
      Number(getSensorValue('P2', jsonFromServerHeater209Time?.so_AI[27])) -
      Number(getSensorValue('P3', jsonFromServerHeater209Time?.so_AI[28])),
    ),
    graph: 'P2_P3',
  },
];

const listIndicatorsForVnT = [
  {
    id: 16,
    title: 'У ІВЦ 1-го поверху',
    value: getSensorValue('T16', jsonFromServerHeater209Time?.so_AI[15]),
    graph: 'T16',
  },
  {
    id: 17,
    title: 'У кабінеті 33 2-го поверху',
    value: getSensorValue('T22', jsonFromServerHeater209Time?.so_AI[31]),
    graph: 'T22',
  },
  {
    id: 18,
    title: 'У приймальній НДІ ВЕМ 2-го поверху',
    value: getSensorValue('T18', jsonFromServerHeater209Time?.so_AI[17]),
    graph: 'T18',
  },
  {
    id: 19,
    title: 'У кабінеті 39 3-го поверху',
    value: getSensorValue('T19', jsonFromServerHeater209Time?.so_AI[28]),
    graph: 'T19',
  },
  {
    id: 20,
    title: 'У кабінеті 46 3-го поверху',
    value: getSensorValue('T20', jsonFromServerHeater209Time?.so_AI[29]),
    graph: 'T20',
  },
  {
    id: 21,
    title: 'У кабінеті ООТ 1-го поверху.',
    value: getSensorValue('T21', jsonFromServerHeater209Time?.so_AI[30]),
    graph: 'T21',
  },
  {
    id: 22,
    title: 'У навчальному класі 1-го поверху',
    value: getSensorValue('T17', jsonFromServerHeater209Time?.so_AI[16]),
    graph: 'T17',
  },
];
const [role, setRole] = useState<null | any>(null);

useEffect(() => {
    const getRoleFromLocalStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('role');
        if (value !== null) {
          setRole(value);
        }
      } catch (error) {
        console.error('Error getting role from local storage:', error);
      }
    };
    getRoleFromLocalStorage();
}, []);

const handleRestart = () => {
  RNRestart.Restart();
};

useEffect(() => {
  setHeatingToggle(chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 31));
  setBinaryString(String(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General)))
}, [jsonFromServerHeater209?.TS_ComSC_General]);

const navigation = useNavigation();

const publishData = (_topic: string, _message: string) => {}; // MQTT publishing disabled

const topicArm = 'Heater/' + boilerCode?.boilerCode + '/arm';
const topicTrigger = 'Heater/' + boilerCode?.boilerCode + '/trigger';
const topicTime = 'Heater/' + boilerCode?.boilerCode + '/time';
const topicSettings = 'Heater/' + boilerCode?.boilerCode + '/settings';

const createSendBoilerOnToTopic = () => {
  const sendDataToTopic = () => {
    const topic = topicArm;
    if (jsonFromServerHeater209D){
      const modifiedJson = {
        so_cmd: chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 31)? [2] : [1],
      };
      publishData(topic, JSON.stringify(modifiedJson));
    }
  };

  return sendDataToTopic;
};
const sendData = createSendBoilerOnToTopic();

const [binaryString, setBinaryString] = useState(String(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General)));

const toggle19thBit = (roz: number) => {
  const binaryArray = binaryString.split('');
  const nineteenthBit = binaryArray[binaryArray.length - roz];

  binaryArray[binaryArray.length - roz] = nineteenthBit === '0' ? '1' : '0';

  const newBinaryString = binaryArray.join('');
  setBinaryString(newBinaryString); // Обновляем состояние

  const decimalValue = parseInt(newBinaryString.slice(16), 2);

  const topic = topicArm;
  if (jsonFromServerHeater209D) {
    const modifiedJson = {
      set_options: [decimalValue],
    };
    publishData(topic, JSON.stringify(modifiedJson));
  }
};

const sendStateToTopic = (number: number) => {
  const topic = topicArm;
  if (jsonFromServerHeater209D){
    const modifiedJson = {
      so_cmd: [number]
    };
    publishData(topic, JSON.stringify(modifiedJson));
  };
};

const sendT5UstToTopic = (ustValue: number) => {
  const topic = topicArm;
  if (jsonFromServerHeater209D){
    const modifiedJson = {
      ust_t5: [ustValue]
    };
    publishData(topic, JSON.stringify(modifiedJson));
  };
};
const [ustInnerT, setUstInnerT] = useState(jsonFromServerHeater209?.so_aut_innerT !== undefined ? (jsonFromServerHeater209?.so_aut_innerT[0] ? jsonFromServerHeater209?.so_aut_innerT[0] : 0): 0);

const sendUstInnerTToTopic = (ustInnerTValue: number) => {
  const topic = topicArm;

  if (jsonFromServerHeater209D) {
    const modifiedJson = { ...jsonFromServerHeater209 };
    modifiedJson.so_aut_innerT = [...modifiedJson.so_aut_innerT];
    modifiedJson.so_aut_innerT[2] = ustInnerTValue;

    publishData(topic, JSON.stringify(modifiedJson));
  }
};

const handleUstInnerTChange = (value) => {
  setUstInnerT(value);
};


const OptionContent1 = () => {
  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{width: 20}} />
        <Text style={[IndexStyle.BottomTitle, {color: '#ffffff'}]}>ПолуАвтомат</Text>
        
        <TouchableOpacity
          onPress={(): void => { setModalVisibleStateHeat(true);}}>
        <View
          style={{
            borderColor: '#404040',
            borderWidth: 2,
            borderRadius: 50,
            marginTop: -4,
          }}>
          <Image
            style={{width: 22, height: 22, margin: 6, opacity: 0.4}}
            source={require('../../../public/images/gear.png')}
          />
        </View>
        </TouchableOpacity>
        
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[IndexStyle.BottomTitle]}>T5: <Text style={[IndexStyle.BottomTitle, {color: '#ffffff'}]}>{getSensorValue('T5', jsonFromServerHeater209Time?.so_AI[4])}{units.degrees}</Text></Text>
        <Text style={[IndexStyle.BottomTitle, {margin: 5}]}>Ust: <Text style={[IndexStyle.BottomTitle, {color: '#ffffff'}]}>48{units.degrees}</Text></Text>
      </View>
      </>
  );
};

const OptionContent2 = () => {
  return (
   <>
     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
     <View style={{width: 20}} />
      <Text style={[IndexStyle.BottomTitle, {color: '#ffffff'}]}>Графік</Text>
      <TouchableOpacity
      onPress={(): void => { setModalVisibleStateHeat(true);}}>
      <View
          style={{
            borderColor: '#404040',
            borderWidth: 2,
            borderRadius: 50,
            marginTop: -4,
          }}>
          <Image
            style={{width: 22, height: 22, margin: 6, opacity: 0.4}}
            source={require('../../../public/images/gear.png')}
          />
        </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[IndexStyle.BottomTitle]}>T5: <Text style={[IndexStyle.BottomTitle, {color: '#ffffff'}]}>{getSensorValue('T5', jsonFromServerHeater209Time?.so_AI[4])}{units.degrees}</Text>;</Text>
        <Text style={[IndexStyle.BottomTitle, {margin: 7}]}>T14: <Text style={[IndexStyle.BottomTitle, {color: '#ffffff'}]}>{getSensorValue('T14', jsonFromServerHeater209Time?.so_AI[13])}{units.degrees}</Text> {'=>'} Ust: <Text style={[IndexStyle.BottomTitle, {color: '#ffffff'}]}>48{units.degrees}</Text></Text>
      </View>
    </>
  );
};

const OptionContent3 = () => {
  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{width: 20}} />
        <Text style={[IndexStyle.BottomTitle, {color: '#ffffff'}]}>Внутрішня Т</Text>
        <TouchableOpacity
      onPress={(): void => { setModalVisibleStateHeat(true);}}>
        <View
          style={{
            borderColor: '#404040',
            borderWidth: 2,
            borderRadius: 50,
            marginTop: -4,
          }}>
          <Image
            style={{width: 22, height: 22, margin: 6, opacity: 0.4}}
            source={require('../../../public/images/gear.png')}
          />
        </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[IndexStyle.BottomTitle, {margin: 5}]}>Ust: <Text style={[IndexStyle.BottomTitle, {color: '#ffffff'}]}>48{units.degrees}</Text></Text>
      </View>
    </>
  );
};

const OptionContent4 = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={[IndexStyle.BottomTitle]}></Text>
      <Text style={[IndexStyle.BottomTitle, {color: '#ffffff'}]}>Не визначено</Text>
      <View>
        <Text style={[IndexStyle.BottomTitle, {margin: 5}]}></Text>
      </View>
    </View>
  );
};

const OptionContent5 = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={[IndexStyle.BottomTitle]}></Text>
      <Text style={[IndexStyle.BottomTitle, {color: '#ffffff'}]}>Ручний</Text>
      <View>
        <Text style={[IndexStyle.BottomTitle, {margin: 5}]}></Text>
      </View>
    </View>
  );
};
const [selectedOption, setSelectedOption] = useState({label: 'Не визначено', content: <OptionContent4 />});

  useEffect(() => {
    if (controlMode === 29) {
      setSelectedOption({label: 'ПолуАвтомат', content: <OptionContent1 />});
    } else if (controlMode === 28) {
      setSelectedOption({label: 'Графік', content: <OptionContent2 />});
    } else if (controlMode === 27) {
      setSelectedOption({label: 'Внутрішня Температура', content: <OptionContent3 />});
    } else if (controlMode === 30) {
      setSelectedOption({label: 'Ручний Т', content: <OptionContent5 />});
    } else {
      setSelectedOption({label: 'Не визначено', content: <OptionContent4 />});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlMode]);


  const renderContent = () => {
    if (selectedOption === null) {
      return null;
    }

    return (
      <View>
        {selectedOption.content}
      </View>
    );
  };

const [ustValue, setUstValue] = useState(jsonFromServerHeater209?.so_semi_aut[2] ? jsonFromServerHeater209?.so_semi_aut[2] : 0);

const handleUstChange = (value) => {
  setUstValue(value);
};

const scrollViewRef = useRef(null);

const scrollToEnd = () => {
  if (scrollViewRef.current) {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }
};
const scrollToStart = () => {
  if (scrollViewRef.current) {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  }
};

const addLeadingZero = (value) => (value < 10 ? `0${value}` : value);

const [isModalVisibleHeader, setModalVisibleHeader] = useState(false);

const toggleModalHeader = (): void => {
  setModalVisibleHeader(!isModalVisibleHeader);
};

const reconnectToMqtt = () => {}; // MQTT reconnect disabled

const handleReconnectClick = () => {
  reconnectToMqtt();
};

const handleButtonPress = (message: string | undefined) => {
  Alert.alert('Стан', message);
};

const pumpAlertButtonPress = (messages: (string | null)[] | undefined) => {
  if (!messages || messages.length === 0) {
    return;
  }

  const combinedMessage = messages.filter(Boolean).join('\n');

  Alert.alert('Стан механізму', combinedMessage ? combinedMessage : 'В нормі');
};


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

useEffect(() => {
  const loadShemaSensorValues = async () => {
    if (!boilerCode) {
      return;
    }

    try {
      const parseMaybeJson = (value: any) => {
        if (typeof value === 'string' && value.trim()) {
          return JSON.parse(value);
        }

        return value;
      };

      const getShemaSensorValues = (settingsSource: any) => {
        const settings = parseMaybeJson(settingsSource);
        const rawValues = settings?.shemaSensorValues ?? settingsSource?.shemaSensorValues;
        return parseMaybeJson(rawValues);
      };

      const response = await fetch('http://asaiot.net/boilersConstructor/api/data.php');
      const result = await response.json();

      const selectedBoilerCode = boilerCode?.boilerCode;
      const items = Array.isArray(result)
        ? result
        : Array.isArray(result?.value)
          ? result.value
          : [result];
      const matched = items.find(
        (item: any) => String(item.boilerCode) === String(selectedBoilerCode),
      );

      if (!matched) {
        setSensorValues(null);
        setBoilerIsActive(false);
        setControlMode(null);
        setSensorValuesError('Boiler configuration not found');
        return;
      }

      const parsedValues =
        getShemaSensorValues(matched.settings) ||
        getShemaSensorValues(matched);

      setSensorValues(parsedValues || null);
      setBoilerIsActive(
        matched.isActive === true ||
        matched.isActive === 'true' ||
        Number(matched.isActive) === 1,
      );
      setControlMode(Number.isNaN(Number(matched.controlMode)) ? null : Number(matched.controlMode));
      setSensorValuesError(null);
    } catch (error) {
      console.error('Failed to load sensor values:', error);
      setSensorValues(null);
      setBoilerIsActive(false);
      setControlMode(null);
      setSensorValuesError('РћС€РёР±РєР° Р·Р°РіСЂСѓР·РєРё РґР°РЅРЅС‹С… API');
    }
  };

  loadShemaSensorValues();
}, [boilerCode]);

useEffect(() => {
  const interval = setInterval(() => {
    setSensorValues(currentSensorValues =>
      addRandomSensorValuesOffset(currentSensorValues),
    );
    setLastUpdatedTime(formatCurrentTime());
  }, 30000);

  return () => clearInterval(interval);
}, []);

const tenValues = boilerCode?.shemaTen;
const tenValues2 = boilerCode?.shemaTen2;

function pairSwap(array: any[]) {
  let swappedArray: any[] = [];
  for (let i = 0; i < array.length; i += 2) {
    if (i + 1 < array.length) {
      swappedArray.push(array[i + 1], array[i]);
    } else {
      swappedArray.push(array[i]);
    }
  }
  return swappedArray;
}

const getTenColors = (tenValuesData: any, tenId: any) => {
  const parsedTenValues =
    typeof tenValuesData === 'string'
      ? JSON.parse(tenValuesData || '{}')
      : tenValuesData || {};
  const valueParamTMP = parsedTenValues[`Ten${tenId}`]?.valueParamTMP;

  return valueParamTMP === '1' || valueParamTMP === 1
    ? ['#67E761', colors.green]
    : [colors.gray, colors.gray];
};

return (
    <View style={{marginTop: 50}}>
      <LinearGradient
        colors={['#90849a', '#7f7bb7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
      <View style={{margin: 0, marginTop: 5}}>
        <View style={{marginLeft: -16, marginRight: -16}}>
          {/*<View style={[IndexStyle.Row, {margin: 15,  marginTop: -10}]}>
          <TouchableOpacity onPress={sendData}>
            <View style={{marginTop: 10}}>
              {
                chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 31) ? (
                  <Text style={[IndexStyle.TopTitle, {color: colors.lightGreen}]}>Включено</Text>
                ) : <Text style={[IndexStyle.TopTitle, {color: '#ffffff'}]}>Вимкнено</Text>
              }
              <Text style={IndexStyle.BottomTitle}>Оновлено o {jsonFromServerHeater209?.date_time[1]}:{jsonFromServerHeater209?.date_time[0]}</Text>
            </View>
          </TouchableOpacity>
            <View style={IndexStyle.RowFlexEnd}>
              <SwitchToggleComponent isSelected={heatingToggle} setIsSelected={setHeatingToggle}/>
            </View>
          </View>*/}
        </View>
          {/*<Text style={[IndexStyle.TopTitle, {marginTop: -5}]}>Режим управління</Text>
          <Text style={IndexStyle.BottomTitle}>Cистемой опалення</Text>*/}
          <View style={{backgroundColor: '#222222', opacity: 0.9, marginLeft: 10, marginRight: 10, marginTop: 25, borderRadius: 15, height: 70}}>
            <View style={{margin: 0, marginTop: 0}}>
            <View style={[IndexStyle.Row, {margin: 10,  marginTop: -15}]}>
                <TouchableOpacity onPress={toggleModalHeader}>
                    <View style={[styles.burgWrap, {marginTop: 20}]}>
                      <Image source={require('../../../public/images/menuIco.png')} style={styles.menuIco} />
                    </View>
                  </TouchableOpacity>
                <TouchableOpacity>
                <View style={{marginTop: 0, marginLeft: -30}}>
                  {
                    boilerIsActive ? (
                      <Text style={[IndexStyle.TopTitle, {color: colors.lightGreen}]}>{boilerCode?.boilerCode} Включено</Text>
                    ) : <Text style={[IndexStyle.TopTitle, {color: '#ffffff'}]}>{boilerCode?.boilerCode} Вимкнено</Text>
                  }
                  <Text style={IndexStyle.BottomTitle}>Оновлено: {lastUpdatedTime}</Text>
                </View>
              </TouchableOpacity>
                <View style={[IndexStyle.RowFlexEnd, {marginTop: 9}]}>
                {role == 'Admin' ? (<SwitchToggleComponent isSelected={boilerIsActive} setIsSelected={() => setModalVisibleConfirm4(true)}/>):<SwitchToggleComponent isSelected={boilerIsActive} setIsSelected={()=>{}}/>}
                </View>
              </View>
            </View>
          </View>
          <ScrollView>
          <View style={{flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity onPress={() => handleButtonPress('Датчик вологості – ' + (chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 20) ? 'Аварія' : 'Норма'))}>

          <View style={{backgroundColor: '#222222', opacity: 0.6, borderRadius: 50, width: 40, height: 40, marginLeft: 10}}>
          {chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 20) ?
          <Image
              style={{width: 30, height: 30, margin: 5, marginLeft: 5}}
              source={require('../../../public/images/bx-water-red.svg.png')}
            />:
            <Image
              style={{width: 30, height: 30, margin: 5, marginLeft: 5}}
              source={require('../../../public/images/bx-water.svg.png')}
            />}
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleButtonPress('Розгерметизація системи опалення - '  + (chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 25) ? 'Аварія' : 'Норма'))}>
            <View style={{backgroundColor: '#222222', opacity: 0.6, borderRadius: 50, width: 40, height: 40}}>
                {chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 25) ?
                <Image
                style={{width: 28, height: 28, margin: 6}}
                source={require('../../../public/images/bx-bell-red.svg.png')}
                />
                :
                <Image
                  style={{width: 28, height: 28, margin: 6}}
                  source={require('../../../public/images/bx-bell.svg.png')}
                />
                }
                {/*<View style={{position: 'absolute', backgroundColor: '#DA5757', width: 15, height: 15, borderRadius: 50, marginLeft: 25}}/>*/}
      
            </View>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => {
                setActiveScreen(route.name);
                if (activeScreen === 'Котли') {
                  navigation.navigate('Опалення');
                } else if (activeScreen === 'Опалення') {
                  navigation.navigate('Котли');
                }
              }}
            >
            <View style={{backgroundColor: '#222222', opacity: 0.6, borderRadius: 50, width: 40, height: 40, marginRight: 10}}>
                <Image
                  style={{width: 24, height: 24, margin: 8, marginLeft: 8}}
                  source={require('../../../public/images/refresh.jpg')}
                />
            </View>
            </TouchableOpacity>

          </View>

          <View style={{marginTop: 0, marginBottom: 10}}>
        </View>
        <View style={PageMainStyle.ScrollViewContainer}>
          <ScrollView horizontal ref={scrollViewRef} style={{height: 220, zIndex: 99}}>
            <View>
            <View style={{marginLeft: 30}}>
              {/* Shemes block */}
              <View style={{marginLeft: -20, marginTop: 60}}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
              <View >
              <View style={IndexStyle.RowFlexCenter}>

            <View>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 0}}>
              <View style={{}}>
                <Text style={{color: '#ffffff', marginTop: 25, marginLeft: 35, fontSize: 16, position: 'absolute'}}>P3</Text>
                <Text style={{color: '#ffffff', marginTop: 50, marginLeft: 20, fontSize: 14, position: 'absolute', width: 40}}>
                  {getSensorValue('P3', jsonFromServerHeater209Time?.so_AI[20])},{units.pressure}
                </Text>
              </View>
            <View style={{borderColor: '#ffffff', borderWidth: 1, width: 80, height: 1, marginTop: 49}} />
            <View style={{borderColor: '#ffffff', borderWidth: 2, borderRadius: 10, width: 170, height: 100}}>
            <TouchableOpacity style={{backgroundColor: 'red', zIndex: 3}}
              onPress={(): void => {
                pumpAlertButtonPress(
                  [
                  chooseState(createBinaryString(jsonFromServerHeater209?.so_TS_ST[20]), 24) ? 
                  'Помилка вимкнення' 
                  : 
                  null,
                  chooseState(createBinaryString(jsonFromServerHeater209?.so_TS_ST[20]), 23) ? 
                  'Несанкціоноване включення' 
                  : 
                  null,
                  chooseState(createBinaryString(jsonFromServerHeater209?.so_TS_ST[20]), 22) ? 
                  'Несанкціоноване вимкнення' 
                  : 
                  null,
                  chooseState(createBinaryString(jsonFromServerHeater209?.so_TS_ST[20]), 21) ? 
                  "Помилка зв'язку (Modbus RTU)" 
                  : 
                  null,
                ],
                );
              }}>
                {chooseState(createBinaryString(jsonFromServerHeater209?.so_TS_ST[20]), 20) ? 
                <View style={{position: 'absolute', zIndex: 2, marginLeft: 165, marginTop: -20}}>
                  <View style={{backgroundColor: '#222222', opacity: 0.8, borderRadius: 50, width: 40, height: 40}}>
                    <Image
                      style={{ width: 26, height: 26, margin: 5, marginLeft: 6 }}
                      source={require('../../../public/images/warningpng.png')}
                    />
                  </View>
                </View>
                : null
                }
              <ShemaButton data={jsonFromServerHeater209?.so_TS_ST[20]} title={'Насос 1, V1 = '  + 0 + units.percent} margin={-25}/>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 70}}
              onPress={(): void => {
                pumpAlertButtonPress(
                  [
                  chooseState(createBinaryString(jsonFromServerHeater209?.so_TS_ST[21]), 24) ? 
                  'Помилка вимкнення' 
                  : 
                  null,
                  chooseState(createBinaryString(jsonFromServerHeater209?.so_TS_ST[21]), 23) ? 
                  'Несанкціоноване включення' 
                  : 
                  null,
                  chooseState(createBinaryString(jsonFromServerHeater209?.so_TS_ST[21]), 22) ? 
                  'Несанкціоноване вимкнення' 
                  : 
                  null,
                  chooseState(createBinaryString(jsonFromServerHeater209?.so_TS_ST[21]), 21) ? 
                  "Помилка зв'язку (Modbus RTU)" 
                  : 
                  null,
                ],
                );
              }}>
              {chooseState(createBinaryString(jsonFromServerHeater209?.so_TS_ST[21]), 20) ? 
                <View style={{position: 'absolute', zIndex: 2, marginLeft: 165, marginTop: 5}}>
                  <View style={{backgroundColor: '#222222', opacity: 0.8, borderRadius: 50, width: 40, height: 40}}>
                    <Image
                      style={{ width: 26, height: 26, margin: 5, marginLeft: 6 }}
                      source={require('../../../public/images/warningpng.png')}
                    />
                  </View>
                </View>
                : null
                }
              <ShemaButton data={jsonFromServerHeater209?.so_TS_ST[21]} title={'Насос 2, V2 = ' + 74.99 + units.percent} margin={0}/>
            </TouchableOpacity>
            </View>

              <View style={{borderColor: '#ffffff', borderWidth: 1, width: 50, height: 1, marginTop: 49}}>

                </View>
                <View style={{}}>
                  <Text style={{color: '#ffffff', marginTop: 25, marginLeft: -33, fontSize: 16, position: 'absolute'}}>P2</Text>
                  <Text style={{color: '#ffffff', marginTop: 50, marginLeft: -33, fontSize: 14, position: 'absolute'}}>
                    {getSensorValue('P2', jsonFromServerHeater209Time?.so_AI[19])},{units.pressure}
                  </Text>
                </View>
              </View>
            </View>
              <View>
              <Text style={[ShemesStyle.T12tTopTitle, {marginLeft: 65}]}>T12</Text>
                <Text style={[ShemesStyle.T12BorromTitle, {marginLeft: 65, width: 40}]}>
                  {getSensorValue('T12', jsonFromServerHeater209Time?.so_AI[11])},{units.degrees}
                </Text>
              </View>
              <View style={ShemesStyle.LeftBorder} />
              <View style={[ShemesStyle.CenterBorder, {marginLeft: 0}]}>

                <TouchableOpacity
                  onPress={(): void => {
                      setModalVisibleTenOne(true);
                  }}>
                  <ShemaButton data={jsonFromServerHeater209?.so_TS_ST[22]} title={'Котел 1, T1 = ' + getSensorValue('T1', jsonFromServerHeater209Time?.so_AI[0]) + units.degrees} margin={-25}/>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 30, marginTop: 3, width: 110}}>
                  {pairSwap(listTenOne(jsonFromServerHeater209, tenValues))
                    .reverse()
                    .map((item) => {
                    return (
                      <AnimatedColorView
                      key={item.id}
                      activeIndex={0}
                      colors={getTenColors(tenValues, item.id)}
                      duration={1500}
                      loop={true}
                      style={{width: 7, marginBottom: 10}}>
                        <View style={{width: 7, height: 15, marginLeft: 3, flexDirection: 'row', justifyContent: 'center'}}/>
                        {item.isError === colors.red ?
                        <Image
                        style={{ width: 7, height: 7, marginTop: 6, position: 'absolute', zIndex: 8 }}
                          source={require('../../../public/images/error.png')}
                        />:
                        null}
                      </AnimatedColorView>
                    );
                  })}
                  </View>
                </TouchableOpacity>

                <View style={[IndexStyle.RowFlexSpaceBetween, {marginLeft: 50, marginTop: -50, position: 'absolute'}]}>
                  <TouchableOpacity onPress={() => handleButtonPress('Контроль живлення')} style={{marginLeft: -5}}>
                    <View style={{backgroundColor: '#222222', opacity: 0.6, borderRadius: 50, width: 20, height: 20}}>
                      {jsonFromServerHeater209?.so_TS_ST !== undefined && chooseState(createBinaryString(jsonFromServerHeater209?.so_TS_ST[22]), 30) ?
                        <Image
                        style={{ width: 16, height: 16, margin: 2, marginLeft: 2 }}
                          source={require('../../../public/images/bxs-bolt-circle.svg.png')}
                        />:
                        <Image
                        style={{ width: 16, height: 16, margin: 2, marginLeft: 2 }}
                        source={require('../../../public/images/bxs-bolt-circle1.svg.png')}
                      />
                      }
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleButtonPress('Режим управління')} style={{marginLeft: 5}}>
                    <View style={{backgroundColor: '#222222', opacity: 0.6, borderRadius: 50, width: 20, height: 20}}>
                      {jsonFromServerHeater209?.so_TS_ST !== undefined && chooseState(createBinaryString(jsonFromServerHeater209?.so_TS_ST[22]), 27) ?
                        <Image
                        style={{ width: 14, height: 14, margin: 2, marginLeft: 2 }}
                          source={require('../../../public/images/bxs-hand.svg.png')}
                        />:
                        <Image
                        style={{ width: 14, height: 14, margin: 2, marginLeft: 2 }}
                        source={require('../../../public/images/bxs-hand1.svg.png')}
                      />
                      }
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleButtonPress('Дозвіл "Увімкнути"')} style={{marginLeft: 5}}>
                    <View style={{backgroundColor: '#222222', opacity: 0.6, borderRadius: 50, width: 20, height: 20}}>
                      {jsonFromServerHeater209?.so_TS_ST !== undefined && chooseState(createBinaryString(jsonFromServerHeater209?.so_TS_ST[22]), 19) ?
                        <Image
                        style={{ width: 13, height: 13, margin: 3, marginLeft: 3.5 }}
                          source={require('../../../public/images/stop.png')}
                        />:
                        <Image
                        style={{ width: 13, height: 13, margin: 3, marginLeft: 3.5 }}
                        source={require('../../../public/images/stop1.png')}
                      />
                      }
                    </View>
                  </TouchableOpacity>

                </View>

                <TouchableOpacity
                  style={{marginTop: 70}}
                  onPress={(): void => {
                      setModalVisibleTenOne_(true);
                  }}>
                  <ShemaButton data={jsonFromServerHeater209?.so_TS_ST[23]} title={'Котел 2, T2 = ' + getSensorValue('T2', jsonFromServerHeater209Time?.so_AI[1]) + units.degrees} margin={-25}/>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 30, marginTop: 3, width: 110}}>
                  {pairSwap(listTenOne(jsonFromServerHeater209, tenValues2))
                    .reverse()
                    .map((item) => {
                    return (
                      <AnimatedColorView
                      key={item.id}
                      activeIndex={0}
                      colors={getTenColors(tenValues2, item.id)}
                      duration={1500}
                      loop={true}
                      style={{width: 7, marginBottom: 10}}>
                        <View style={{width: 7, height: 15, marginLeft: 3, flexDirection: 'row', justifyContent: 'center'}}/>
                        {item.isError === colors.red ?
                        <Image
                        style={{ width: 8, height: 8, marginTop: 6, position: 'absolute', zIndex: 8 }}
                          source={require('../../../public/images/error.png')}
                        />:
                        null}
                      </AnimatedColorView>
                    );
                  })}
                  </View>
                </TouchableOpacity>
                <View style={[IndexStyle.RowFlexSpaceBetween, {marginLeft: 7, marginTop: 6, position: 'absolute'}]}>
                  <Text style={[IndexStyle.TopTitle, {fontSize: 13}]}>Час очікування: {checkData(jsonFromServerHeater209Time?.controlT[0])} (хв)</Text>
                </View>

                <View style={[IndexStyle.RowFlexSpaceBetween, {marginLeft: 50, marginTop: 50, position: 'absolute'}]}>
                  <TouchableOpacity onPress={() => handleButtonPress('Контроль живлення')} style={{marginLeft: -5}}>
                    <View style={{backgroundColor: '#222222', opacity: 0.6, borderRadius: 50, width: 20, height: 20}}>
                      {jsonFromServerHeater209?.so_TS_ST !== undefined && chooseState(createBinaryString(jsonFromServerHeater209?.so_TS_ST[23]), 30) ?
                        <Image
                        style={{ width: 16, height: 16, margin: 2, marginLeft: 2 }}
                          source={require('../../../public/images/bxs-bolt-circle.svg.png')}
                        />:
                        <Image
                        style={{ width: 16, height: 16, margin: 2, marginLeft: 2 }}
                        source={require('../../../public/images/bxs-bolt-circle1.svg.png')}
                      />
                      }
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={() => handleButtonPress('Режим управління')} style={{marginLeft: 5}}>
                    <View style={{backgroundColor: '#222222', opacity: 0.6, borderRadius: 50, width: 20, height: 20}}>
                      {jsonFromServerHeater209?.so_TS_ST !== undefined && chooseState(createBinaryString(jsonFromServerHeater209?.so_TS_ST[23]), 27) ?
                        <Image
                        style={{ width: 14, height: 14, margin: 2, marginLeft: 2 }}
                          source={require('../../../public/images/bxs-hand.svg.png')}
                        />:
                        <Image
                        style={{ width: 14, height: 14, margin: 2, marginLeft: 2 }}
                        source={require('../../../public/images/bxs-hand1.svg.png')}
                      />
                      }
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleButtonPress('Дозвіл "Увімкнути"')} style={{marginLeft: 5}}>
                    <View style={{backgroundColor: '#222222', opacity: 0.6, borderRadius: 50, width: 20, height: 20}}>
                      {jsonFromServerHeater209?.so_TS_ST !== undefined && chooseState(createBinaryString(jsonFromServerHeater209?.so_TS_ST[23]), 19) ?
                        <Image
                        style={{ width: 13, height: 13, margin: 3, marginLeft: 3.5 }}
                          source={require('../../../public/images/stop.png')}
                        />:
                        <Image
                        style={{ width: 13, height: 13, margin: 3, marginLeft: 3.5 }}
                        source={require('../../../public/images/stop1.png')}
                      />
                      }
                    </View>
                  </TouchableOpacity>

                </View>
              </View>
              <View style={ShemesStyle.RightBorderCenterContainer}>

              </View>

              <View style={{}}>
                <Text style={{color: '#ffffff', marginTop: 25, marginLeft: -70, fontSize: 16, position: 'absolute'}}>T5</Text>
                <Text style={{color: '#ffffff', marginTop: 50, marginLeft: -70, fontSize: 14, position: 'absolute'}}>
                  {getSensorValue('T5', jsonFromServerHeater209Time?.so_AI[4])},{units.degrees}
                </Text>
              </View>
            </View>
            </View>

            </View>

            </View>
            <View/>

            </View>
            </View>
            </ScrollView>

            <View style={{flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: -20}}>
          <TouchableOpacity disabled={isShemaButtonOn} onPress={() => {setIsShemaButtonOn(true); scrollToStart()}}>
            <View style={{backgroundColor: '#222222', opacity: isShemaButtonOn ? 0.3 : 0.6, borderRadius: 50, width: 40, height: 40, marginLeft: 10}}>
            <Image
              style={{width: 18, height: 24, margin: 8, marginLeft: 8}}
              source={require('../../../public/images/lefybig.png')}
            />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleButtonPress('Включення')}>
            <View style={{backgroundColor: '#222222', opacity: 0.6, borderRadius: 50, width: 40, height: 40}}>
            {jsonFromServerHeater209?.so_BH !== undefined && chooseState(createBinaryString(jsonFromServerHeater209?.so_BH[0]), 21) ?
              <Image
              style={{ width: 26, height: 26, margin: 7, marginLeft: 7 }}
                source={require('../../../public/images/bx-toggle-right1.svg.png')}
              />:
              <Image
              style={{ width: 26, height: 26, margin: 7, marginLeft: 7 }}
              source={require('../../../public/images/bx-toggle-right.svg.png')}
            />
            }
            </View>
          </TouchableOpacity>

          {jsonFromServerHeater209?.so_BH !== undefined && chooseState(createBinaryString(jsonFromServerHeater209?.so_BH[0]), 18) ?
            <TouchableOpacity onPress={() => handleButtonPress('Регулювання температури')}>
            <View style={{backgroundColor: '#222222', opacity: 0.6, borderRadius: 50, width: 40, height: 40}}>
            {jsonFromServerHeater209?.so_BH !== undefined && chooseState(createBinaryString(jsonFromServerHeater209?.so_BH[0]), 18) ?
              <Image
              style={{ width: 26, height: 26, margin: 7, marginLeft: 7 }}
                source={require('../../../public/images/bxs-thermometer1.svg.png')}
              />:
              <Image
              style={{ width: 26, height: 26, margin: 7, marginLeft: 7 }}
              source={require('../../../public/images/bxs-thermometer.svg.png')}
            />
            }
            </View>
          </TouchableOpacity>
            : null}

          {jsonFromServerHeater209?.so_BH !== undefined && chooseState(createBinaryString(jsonFromServerHeater209?.so_BH[0]), 19) ?
          <TouchableOpacity onPress={() => handleButtonPress('Регулювання температури')}>
          <View style={{backgroundColor: '#222222', opacity: 0.6, borderRadius: 50, width: 40, height: 40}}>
          {jsonFromServerHeater209?.so_BH !== undefined && chooseState(createBinaryString(jsonFromServerHeater209?.so_BH[0]), 19) ?
            <Image
              style={{ width: 26, height: 26, margin: 7, marginLeft: 7 }}
              source={require('../../../public/images/bxs-thermometer1.svg.png')}
            />:
            <Image
            style={{ width: 26, height: 26, margin: 7, marginLeft: 7 }}
            source={require('../../../public/images/bxs-thermometer.svg.png')}
          />
          }
          </View>
          </TouchableOpacity>
           : null}


          <TouchableOpacity onPress={() => handleButtonPress('Регулювання швидкості потоку')}>
          <View style={{backgroundColor: '#222222', opacity: 0.6, borderRadius: 50, width: 40, height: 40}}>
            {jsonFromServerHeater209?.so_BH !== undefined && chooseState(createBinaryString(jsonFromServerHeater209?.so_BH[0]), 20) ?
              <Image
              style={{ width: 26, height: 26, margin: 7, marginLeft: 7 }}
                source={require('../../../public/images/bx-slider-alt1.svg.png')}
              />:
              <Image
              style={{ width: 26, height: 26, margin: 7, marginLeft: 7 }}
              source={require('../../../public/images/bx-slider-alt.svg.png')}
            />
            }
          </View>
          </TouchableOpacity>



          <TouchableOpacity onPress={() => handleButtonPress('Контроль системи розморожування')}>
          <View style={{backgroundColor: '#222222', opacity: 0.6, borderRadius: 50, width: 40, height: 40}}>
            {jsonFromServerHeater209?.so_BH !== undefined && chooseState(createBinaryString(jsonFromServerHeater209?.so_BH[0]), 16) ?
              <Image
              style={{ width: 28, height: 28, margin: 5, marginLeft: 6 }}
                source={require('../../../public/images/bx-health1.svg.png')}
              />:
              <Image
              style={{ width: 27, height: 27, margin: 6, marginLeft: 6 }}
              source={require('../../../public/images/bx-health.svg.png')}
            />
            }
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleButtonPress('Пікові години ЕЕ')}>
          <View style={{backgroundColor: '#222222', opacity: 0.6, borderRadius: 50, width: 40, height: 40}}>
            {jsonFromServerHeater209?.so_BH !== undefined && chooseState(createBinaryString(jsonFromServerHeater209?.so_BH[0]), 29) ?
              <Image
              style={{ width: 28, height: 28, margin: 6, marginLeft: 5 }}
                source={require('../../../public/images/bx-trending-up1.svg.png')}
              />:
              <Image
              style={{ width: 28, height: 28, margin: 6, marginLeft: 5 }}
              source={require('../../../public/images/bx-trending-up.svg.png')}
            />
            }
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleButtonPress('Вимкнення')}>
          <View style={{backgroundColor: '#222222', opacity: 0.6, borderRadius: 50, width: 40, height: 40}}>
            {jsonFromServerHeater209?.so_BH !== undefined && chooseState(createBinaryString(jsonFromServerHeater209?.so_BH[0]), 17) ?
              <Image
              style={{ width: 28, height: 28, margin: 5, marginLeft: 6 }}
                source={require('../../../public/images/bx-toggle-left1.svg.png')}
              />:
              <Image
              style={{ width: 27, height: 27, margin: 6, marginLeft: 6 }}
              source={require('../../../public/images/bx-toggle-left.svg.png')}
            />
            }
          </View>
          </TouchableOpacity>

          <TouchableOpacity disabled={!isShemaButtonOn} onPress={() => {setIsShemaButtonOn(false); scrollToEnd()}}>
            <View style={{backgroundColor: '#222222', opacity: !isShemaButtonOn ? 0.3 : 0.6, borderRadius: 50, width: 40, height: 40, marginRight: 10}}>
              <Image
                style={{ width: 18, height: 24, margin: 8, marginLeft: 12 }}
                source={require('../../../public/images/rightbig.png')}
              />
            </View>
            </TouchableOpacity>

            </View>

          <View style={{backgroundColor: '#222222', opacity: 0.9, marginTop: 15, height: 500, borderTopLeftRadius: 23, borderTopRightRadius: 23}}>
            <View style={{margin: 20, marginTop: 10}}>
              {renderContent()}
            </View>
            
            <View style={{marginTop: -10}}>
            {role == 'Admin' ? (
              <ScrollView horizontal>
              <View style={IndexStyle.RowFlexStart}>

              <TouchableOpacity style={{position: 'relative', zIndex: 999}} onPress={(): void => {
                      setModalVisibleConfirm(true);
                  }}>
                <View style={{height: 50, backgroundColor: '#99f2b8', margin: 10, borderRadius: 10}}>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', margin: 10}}>
                    <Image
                      style={{width: 27, height: 24}}
                      source={require('../../../public/images/pngkit_tech.png')}
                    />
                    <Text style={{color: '#ffffff', fontSize: 20, marginLeft: 10}}>П/A</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{position: 'relative', zIndex: 999}} onPress={(): void => {
                      setModalVisibleConfirm2(true);
                  }}>
                <View style={{height: 50, backgroundColor: '#86d8ca', margin: 10, borderRadius: 10, marginLeft: -5}}>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', margin: 10}}>
                    <Image
                      style={{width: 24, height: 24}}
                      source={require('../../../public/images/combo-xxl.png')}
                    />
                    <Text style={{color: '#ffffff', fontSize: 20, marginLeft: 10}}>Графік</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{position: 'relative', zIndex: 999}} onPress={(): void => {
                      setModalVisibleConfirm3(true);
                  }}>
                <View style={{height: 50, backgroundColor: '#6db6e3', margin: 10, borderRadius: 10, marginLeft: -5}}>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', margin: 10}}>
                    <Image
                      style={{width: 22, height: 26}}
                      source={require('../../../public/images/temperature-xxl.png')}
                    />
                    <Text style={{color: '#ffffff', fontSize: 20, marginLeft: 10}}>Вн. Т</Text>
                  </View>
                </View>
              </TouchableOpacity>

              </View>
              </ScrollView>
              ): null}
            </View>
            
            <View style={{height: 10}}></View>
                <View style={{borderColor: '#464646', borderWidth: 1}}></View>
          <View style={IndexStyle.Row}>
            <View style={{margin: 10, marginTop: 0}}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={IndexStyle.TopTitle}></Text>
                <Text style={[IndexStyle.BottomTitle, {color: '#ffffff'}]}>Показники</Text>
                <Text style={IndexStyle.TopTitle}></Text>
              </View>

                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                  <View
                    style={{
                      width: '100%',
                      margin: -5
                    }}>
                    {listIndicators.map((item)=> {
                      return (
                        <View style={IndexStyle.Row} key={item.id}>
                          <Text style={[IndexStyle.ListTitle, {fontSize: 16}]}>{item.title}: </Text>
                          <View style={[IndexStyle.Row, {marginTop: 10}]}>
                            <Text style={[IndexStyle.ListTitle, {margin: 0}]}>
                            {item.value ? item.value :
                              0
                            } </Text>
                           
                            </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{height: 100}}></View>
            {/*<TouchableOpacity style={{borderRadius: 50, backgroundColor: 'black', marginTop: 27, marginRight: 10}} onPress={handleRestart}>
                <Image style={{ width: 33, height: 33 }} source={require('../../../public/images/refresh.jpg')} />
              </TouchableOpacity>
              <View style={{height: 30}}></View>
              <TouchableOpacity style={{borderRadius: 50, marginTop: 27, marginRight: 10}} onPress={() => {navigation.navigate('Авторизація');}}>
                <Image style={{ width: 33, height: 33 }} source={require('../../../public/images/user-card.png')} />
              </TouchableOpacity>
                  */}
        </View>
<Modal
  animationInTiming={200}
  animationOutTiming={200}
  onBackdropPress={toggleModalStateHeat}
  isVisible={isModalVisibleStateHeat}
  backdropOpacity={0.6}
  style={{ margin: 0, justifyContent: 'flex-end' }}
>
  <View
    style={{
      backgroundColor: '#1e1e1e',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 30,
    }}
  >
    {/* Заголовок */}
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
      }}
    >
      <View>
        <Text
          style={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          Режим управління: {selectedOption.label}
        </Text>

        {selectedOption.label === 'ПолуАвтомат' && (
          <Text style={{ color: '#a1a1a1', fontSize: 14, marginTop: 4 }}>
            Уставка Т5: 48 {units.degrees}
          </Text>
        )}

        {selectedOption.label === 'Внутрішня Температура' && (
          <Text style={{ color: '#a1a1a1', fontSize: 14, marginTop: 4 }}>
            Уставка Ust: 48 {units.degrees}
          </Text>
        )}
      </View>

      <View
        style={{
          borderColor: '#404040',
          borderWidth: 2,
          borderRadius: 50,
        }}
      >
        <TouchableOpacity onPress={() => setModalVisibleModeSettings(true)}>
          <Image
            style={{ width: 22, height: 22, margin: 6, opacity: 0.6 }}
            source={require('../../../public/images/gear.png')}
          />
        </TouchableOpacity>
      </View>
    </View>

    {/* Контент */}
    <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
      {/* Режим ПолуАвтомат */}
      {selectedOption.label === 'ПолуАвтомат' && role === 'Admin' && (
        <>
          <Text
            style={{
              color: '#f49104',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 16,
            }}
          >
            Налаштування уставки
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
              <AnimatedCircularProgress
                size={160}
                width={18}
                fill={
                  ustValue === 0
                    ? Number(checkData(jsonFromServerHeater209?.so_semi_aut[2])) * 2
                    : ustValue * 2
                }
                tintColor="#f49104"
                backgroundColor="#333"
                renderCap={({ center }) => (
                  <Circle cx={center.x} cy={center.y} r="8" fill="#ffcd4c" />
                )}
              >
                {() => (
                  <TouchableOpacity
                    onPress={() => sendT5UstToTopic(Math.round(ustValue))}
                    style={{ alignItems: 'center' }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        style={{ width: 22, height: 24 }}
                        source={require('../../../public/images/fire.png')}
                      />
                      <Text
                        style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginLeft: 6 }}
                      >
                        {Math.round(
                          ustValue === 0
                            ? Number(checkData(jsonFromServerHeater209?.so_semi_aut[2]))
                            : ustValue
                        )}
                        {units.degrees}
                      </Text>
                    </View>
                    <Text style={{ color: '#a1a1a1', fontSize: 12, marginTop: 4 }}>
                      Уставка
                    </Text>
                  </TouchableOpacity>
                )}
              </AnimatedCircularProgress>
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Slider
                style={{ width: 180, height: 180 }}
                minimumValue={0}
                maximumValue={50}
                value={
                  ustValue === 0
                    ? Number(checkData(jsonFromServerHeater209?.so_semi_aut[2]))
                    : ustValue
                }
                onValueChange={handleUstChange}
                thumbTintColor="#ffcd4c"
                minimumTrackTintColor="#f49104"
                maximumTrackTintColor="#555"
              />
              <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-between', marginTop: -20 }}>
                <Text style={{ color: '#a1a1a1', fontSize: 12 }}>0{units.degrees}</Text>
                <Text style={{ color: '#a1a1a1', fontSize: 12 }}>25{units.degrees}</Text>
                <Text style={{ color: '#a1a1a1', fontSize: 12 }}>50{units.degrees}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#f49104',
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: 'center',
              marginTop: 8,
            }}
            onPress={() => sendT5UstToTopic(Math.round(ustValue))}
          >
            <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>
              Встановити уставку: {Math.round(
                ustValue === 0
                  ? Number(checkData(jsonFromServerHeater209?.so_semi_aut[2]))
                  : ustValue
              )}
              {units.degrees}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* Режим Внутрішня Температура */}
      {selectedOption.label === 'Внутрішня Температура' && role === 'Admin' && (
        <>
          <Text
            style={{
              color: '#f49104',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 16,
            }}
          >
            Налаштування уставки
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
              <AnimatedCircularProgress
                size={160}
                width={18}
                fill={
                  ustInnerT === 0
                    ? Number(checkData(jsonFromServerHeater209?.so_aut_innerT[2])) * 2
                    : ustInnerT * 2
                }
                tintColor="#f49104"
                backgroundColor="#333"
                renderCap={({ center }) => (
                  <Circle cx={center.x} cy={center.y} r="8" fill="#ffcd4c" />
                )}
              >
                {() => (
                  <TouchableOpacity
                    onPress={() => sendUstInnerTToTopic(Math.round(ustInnerT))}
                    style={{ alignItems: 'center' }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        style={{ width: 22, height: 24 }}
                        source={require('../../../public/images/fire.png')}
                      />
                      <Text
                        style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginLeft: 6 }}
                      >
                        {Math.round(
                          ustInnerT === 0
                            ? Number(checkData(jsonFromServerHeater209?.so_aut_innerT[2]))
                            : ustInnerT
                        )}
                        {units.degrees}
                      </Text>
                    </View>
                    <Text style={{ color: '#a1a1a1', fontSize: 12, marginTop: 4 }}>
                      Уставка
                    </Text>
                  </TouchableOpacity>
                )}
              </AnimatedCircularProgress>
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Slider
                style={{ width: 180, height: 180 }}
                minimumValue={0}
                maximumValue={50}
                value={
                  ustInnerT === 0
                    ? Number(checkData(jsonFromServerHeater209?.so_aut_innerT[2]))
                    : ustInnerT
                }
                onValueChange={handleUstInnerTChange}
                thumbTintColor="#ffcd4c"
                minimumTrackTintColor="#f49104"
                maximumTrackTintColor="#555"
              />
              <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-between', marginTop: -20 }}>
                <Text style={{ color: '#a1a1a1', fontSize: 12 }}>0{units.degrees}</Text>
                <Text style={{ color: '#a1a1a1', fontSize: 12 }}>25{units.degrees}</Text>
                <Text style={{ color: '#a1a1a1', fontSize: 12 }}>50{units.degrees}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#f49104',
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: 'center',
              marginTop: 8,
            }}
            onPress={() => sendUstInnerTToTopic(Math.round(ustInnerT))}
          >
            <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>
              Встановити уставку: {Math.round(
                ustInnerT === 0
                  ? Number(checkData(jsonFromServerHeater209?.so_aut_innerT[2]))
                  : ustInnerT
              )}
              {units.degrees}
            </Text>
          </TouchableOpacity>

          {/* Список температурних індикаторів */}
          <View
            style={{
              marginTop: 24,
              paddingTop: 16,
              borderTopWidth: 1,
              borderTopColor: '#333',
            }}
          >
            <Text
              style={{
                color: '#ffffff',
                fontSize: 18,
                fontWeight: '600',
                marginBottom: 12,
              }}
            >
              Температура
            </Text>

            <ScrollView style={{ maxHeight: 180 }}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                {listIndicatorsForVnT.map((item) => (
                  <View
                    style={{
                      width: '50%',
                      marginBottom: 12,
                    }}
                    key={item.id}
                  >
                    <Text style={{ color: '#a1a1a1', fontSize: 14 }}>
                      {item.graph}:{' '}
                      <Text style={{ color: '#ffffff', fontWeight: '500' }}>
                        {item.value ? item.value : 0}
                      </Text>
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </>
      )}

      <View style={{ height: 10 }} />
    </View>
  </View>
</Modal>
        <Modal
          animationInTiming={200}
          animationOutTiming={200}
          onBackdropPress={toggleModalSettings}
          isVisible={isModalVisibleSettings}>
          <View style={{backgroundColor: '#222222', borderRadius: 10}}>
            <View style={{margin: 15}}>
                <Text style={[IndexStyle.TopTitle, {marginTop: 0}]}>Загальна інформація</Text>
                <View style={{height: 10}}></View>
                <View style={{borderColor: '#464646', borderWidth: 1}}></View>
                <View style={{height: 10}}></View>
                {/*<Text style={IndexStyle.BottomTitle}>Оновлено: {addLeadingZero(jsonFromServerHeater209?.date_time[1])}{addLeadingZero(jsonFromServerHeater209?.date_time[1])? ':' : null}{addLeadingZero(jsonFromServerHeater209?.date_time[0])}</Text>*/}
                <View style={{height: 10}}></View>
                <Button title='Пікові навантаження' color={'#000000'} onPress={(): void => {setModalVisibleSoWeekPik(true)}}/>
                <View style={{height: 10}}></View>
                <Button title='Порядок запуску тенів' color={'#000000'} onPress={(): void => {setModalVisibleSoTen(true)}}/>
                <View style={{height: 10}}></View>
                <Button title='Оновити' color={'#000000'} onPress={handleRestart}/>

              </View>
          </View>
        </Modal>


        <Modal
          animationInTiming={200}
          animationOutTiming={200}
          onBackdropPress={toggleModalModeSettings}
          isVisible={isModalVisibleModeSettings}>
          <View style={{backgroundColor: '#222222', borderRadius: 10}}>
            <View style={{margin: 15}}>
                <Text style={[IndexStyle.TopTitle, {marginTop: 0}]}>Налаштування</Text>
                <View style={{height: 10}}></View>
                <View style={{borderColor: '#464646', borderWidth: 1}}></View>
                <View style={{height: 10}}></View>
                { role == 'Admin' ? 
                <TouchableOpacity onPress={() => {toggle19thBit(13)}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{marginTop: -5}}>
                  {
                    chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 19) ? (
                      <Text style={[IndexStyle.TopTitle, {color: colors.lightGreen, fontSize: 18}]}>Плавне регулювання</Text>
                    ) : <Text style={[IndexStyle.TopTitle, {color: '#ffffff', fontSize: 18}]}>Плавне регулювання</Text>
                  }
                  </View>
                  <View style={{marginTop: -15}}>
                    <SwitchToggleComponent isSelected={chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 19)} setIsSelected={() => {toggle19thBit(13)}}/>
                  </View>
                </View>
              </TouchableOpacity>
              :
              <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{marginTop: -5}}>
              {
                chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 19) ? (
                  <Text style={[IndexStyle.TopTitle, {color: colors.lightGreen, fontSize: 18}]}>Плавне регулювання</Text>
                ) : <Text style={[IndexStyle.TopTitle, {color: '#ffffff', fontSize: 18}]}>Плавне регулювання</Text>
              }
              </View>
              <View style={{marginTop: -15}}>
                <SwitchToggleComponent isSelected={chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 19)} setIsSelected={() => {}}/>
              </View>
            </View>
                }

              { role == 'Admin' ? 
                <TouchableOpacity onPress={() => {toggle19thBit(9)}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{marginTop: -5}}>
                  {
                    chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 23) ? (
                      <Text style={[IndexStyle.TopTitle, {color: colors.lightGreen, fontSize: 18}]}>Пік навантаження</Text>
                    ) : <Text style={[IndexStyle.TopTitle, {color: '#ffffff', fontSize: 18}]}>Пік навантаження</Text>
                  }
                </View>
                <View style={{marginTop: -15}}>
                  <SwitchToggleComponent isSelected={chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 23)} setIsSelected={() => {toggle19thBit(9)}}/>
                </View>
                </View>
              </TouchableOpacity>
              :
              <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{marginTop: -5}}>
                {
                  chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 23) ? (
                    <Text style={[IndexStyle.TopTitle, {color: colors.lightGreen, fontSize: 18}]}>Пік навантаження</Text>
                  ) : <Text style={[IndexStyle.TopTitle, {color: '#ffffff', fontSize: 18}]}>Пік навантаження</Text>
                }
              </View>
              <View style={{marginTop: -15}}>
                <SwitchToggleComponent isSelected={chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 23)} setIsSelected={() => {}}/>
              </View>
              </View>
              }

              { role == 'Admin' ? 
                <TouchableOpacity onPress={() => {toggle19thBit(10)}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{marginTop: -5}}>
                  {
                    chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 22) ? (
                      <Text style={[IndexStyle.TopTitle, {color: colors.lightGreen, fontSize: 18}]}>Тиждень</Text>
                    ) : <Text style={[IndexStyle.TopTitle, {color: '#ffffff', fontSize: 18}]}>Тиждень</Text>
                  }
                </View>
                <View style={{marginTop: -15}}>
                  <SwitchToggleComponent isSelected={chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 22)} setIsSelected={() => {toggle19thBit(10)}}/>
                </View>
                </View>
              </TouchableOpacity>
              :
              <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{marginTop: -5}}>
                {
                  chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 22) ? (
                    <Text style={[IndexStyle.TopTitle, {color: colors.lightGreen, fontSize: 18}]}>Тиждень</Text>
                  ) : <Text style={[IndexStyle.TopTitle, {color: '#ffffff', fontSize: 18}]}>Тиждень</Text>
                }
              </View>
              <View style={{marginTop: -15}}>
                <SwitchToggleComponent isSelected={chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 22)} setIsSelected={() => {}}/>
              </View>
              </View>
              }

              </View>
          </View>
        </Modal>

        <Modal
          animationInTiming={200}
          animationOutTiming={200}
          onBackdropPress={toggleModalConfirm}
          isVisible={isModalVisibleConfirm}>
          <View style={{backgroundColor: '#222222', borderRadius: 10}}>
            <View style={{margin: 15}}>
              <Text style={[IndexStyle.TopTitle, {marginTop: -5}]}>Підтвердження дії</Text>
                <View style={{height: 10}}></View>
                <View style={{borderColor: '#464646', borderWidth: 1}}></View>
                <View style={{height: 10}}></View>
              <Text style={IndexStyle.BottomTitle}>Встановити режим управління: <Text style={[IndexStyle.BottomTitle, {color: '#ffffff'}]}>ПолуАвтомат</Text>?</Text>
              <View style={{height: 10}}></View>
                <Button title='Підтвердити' color={"#99f2b8"} onPress={() => {setControlMode(29); setSelectedOption({label: 'ПолуАвтомат', content: <OptionContent1 />}); sendStateToTopic(8); setModalVisibleConfirm(false);}}/>
            </View>
          </View>
        </Modal>

        <Modal
          animationInTiming={200}
          animationOutTiming={200}
          onBackdropPress={toggleModalConfirm2}
          isVisible={isModalVisibleConfirm2}>
          <View style={{backgroundColor: '#222222', borderRadius: 10}}>
          <View style={{margin: 15}}>
              <Text style={[IndexStyle.TopTitle, {marginTop: -5}]}>Підтвердження дії</Text>
                <View style={{height: 10}}></View>
                <View style={{borderColor: '#464646', borderWidth: 1}}></View>
                <View style={{height: 10}}></View>
              <Text style={IndexStyle.BottomTitle}>Встановити режим управління: <Text style={[IndexStyle.BottomTitle, {color: '#ffffff'}]}>Графік</Text>?</Text>
              <View style={{height: 10}}></View>
                <Button title='Підтвердити' color={"#86d8ca"} onPress={() => {setControlMode(28); setSelectedOption({label: 'Графік', content: <OptionContent2 />}); sendStateToTopic(16); setModalVisibleConfirm2(false);}}/>
            </View>
          </View>
        </Modal>

        <Modal
          animationInTiming={200}
          animationOutTiming={200}
          onBackdropPress={toggleModalConfirm3}
          isVisible={isModalVisibleConfirm3}>
          <View style={{backgroundColor: '#222222', borderRadius: 10}}>
          <View style={{margin: 15}}>
              <Text style={[IndexStyle.TopTitle, {marginTop: -5}]}>Підтвердження дії</Text>
                <View style={{height: 10}}></View>
                <View style={{borderColor: '#464646', borderWidth: 1}}></View>
                <View style={{height: 10}}></View>
              <Text style={IndexStyle.BottomTitle}>Встановити режим управління: <Text style={[IndexStyle.BottomTitle, {color: '#ffffff'}]}>Внутрішня Т</Text>?</Text>
              <View style={{height: 10}}></View>
                <Button title='Підтвердити' color={"#6db6e3"} onPress={() => {setControlMode(27); setSelectedOption({label: 'Внутрішня Температура', content: <OptionContent3 />}); sendStateToTopic(32); setModalVisibleConfirm3(false);}}/>
            </View>
          </View>
        </Modal>

        <Modal
          animationInTiming={200}
          animationOutTiming={200}
          onBackdropPress={toggleModalConfirm4}
          isVisible={isModalVisibleConfirm4}>
          <View style={{backgroundColor: '#222222', borderRadius: 10}}>
          <View style={{margin: 15}}>
              <Text style={[IndexStyle.TopTitle, {marginTop: -5}]}>Підтвердження дії</Text>
                <View style={{height: 10}}></View>
                <View style={{borderColor: '#464646', borderWidth: 1}}></View>
                <View style={{height: 10}}></View>
              <View style={IndexStyle.RowFlexStart}>
                {chooseState(createBinaryString(jsonFromServerHeater209?.TS_ComSC_General), 31) ? <Text style={[IndexStyle.BottomTitle, {color: 'red'}]}>Вимкнути</Text> : <Text style={[IndexStyle.BottomTitle, {color: '#67E761'}]}>Включити</Text>}
                <Text style={[IndexStyle.BottomTitle, {color: '#ffffff'}]}> систему опалення?</Text>
              </View>
              <View style={{height: 10}}></View>
                <Button title='Підтвердити' color={"#6db6e3"} onPress={() => {sendData(); setModalVisibleConfirm4(false)}}/>
            </View>
          </View>
        </Modal>

          <Modal
            animationInTiming={200}
            animationOutTiming={200}
            onBackdropPress={toggleModalTenOne}
            isVisible={isModalVisibleTenOne}>
            <View style={{backgroundColor: '#242424', borderRadius: 10}}>
              <View style={{margin: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', borderColor: '#333334', borderWidth: 1 }}>
                    <View style={{borderColor: '#333334', borderWidth: 1}}>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: 'white'}}>
                          Напруга, V
                        </Text>
                      </View>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {checkData(jsonFromServerHeater209Time?.so_power1[0])}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                        {checkData(jsonFromServerHeater209Time?.so_power1[1])}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                        {checkData(jsonFromServerHeater209Time?.so_power1[2])}
                        </Text>
                      </View>
                    </View>
                    <View style={{borderColor: '#333334', borderWidth: 1}}>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: 'white'}}>
                          Струм, A
                        </Text>
                      </View>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {checkData(jsonFromServerHeater209Time?.so_power1[3])}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {checkData(jsonFromServerHeater209Time?.so_power1[4])}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {checkData(jsonFromServerHeater209Time?.so_power1[5])}
                        </Text>
                      </View>
                    </View>
                    <View style={{borderColor: '#333334', borderWidth: 1}}>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: 'white'}}>
                          Потужність, кВт
                        </Text>
                      </View>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {checkData(jsonFromServerHeater209Time?.so_power1[6])}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {checkData(jsonFromServerHeater209Time?.so_power1[7])}
                        </Text>
                        <Text style={{fontSize: 16, color: '#a1a1a1'}}>
                          {checkData(jsonFromServerHeater209Time?.so_power1[8])}
                        </Text>
                      </View>
                    </View>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationInTiming={200}
            animationOutTiming={200}
            onBackdropPress={toggleModalTenTwo}
            isVisible={isModalVisibleTenTwo}>
            <View style={{backgroundColor: '#242424', borderRadius: 10}}>
              <View style={{margin: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', borderColor: '#333334', borderWidth: 1 }}>
                    <View style={{borderColor: '#333334', borderWidth: 1}}>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: 'white'}}>
                          Напруга, V
                        </Text>
                      </View>
                      <View style={{margin: 5}}>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[0])}
                        </Text>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[1])}
                        </Text>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[2])}
                        </Text>
                      </View>
                    </View>
                    <View style={{borderColor: '#333334', borderWidth: 1}}>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: 'white'}}>
                          Струм, A
                        </Text>
                      </View>
                      <View style={{margin: 5}}>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[3])}
                        </Text>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[4])}
                        </Text>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[5])}
                        </Text>
                      </View>
                    </View>
                    <View style={{borderColor: '#333334', borderWidth: 1}}>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: 'white'}}>
                          Потужність, кВт
                        </Text>
                      </View>
                      <View style={{margin: 5}}>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[6])}
                        </Text>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[7])}
                        </Text>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[8])}
                        </Text>
                      </View>
                    </View>
                </View>
              </View>
            </View>
          </Modal>


          <Modal
            animationInTiming={200}
            animationOutTiming={200}
            onBackdropPress={toggleModalTenOne_}
            isVisible={isModalVisibleTenOne_}>
            <View style={{backgroundColor: '#242424', borderRadius: 10}}>
              <View style={{margin: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', borderColor: '#333334', borderWidth: 1 }}>
                    <View style={{borderColor: '#333334', borderWidth: 1}}>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: 'white'}}>
                          Напруга, V
                        </Text>
                      </View>
                      <View style={{margin: 5}}>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[0])}
                        </Text>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[1])}
                        </Text>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[2])}
                        </Text>
                      </View>
                    </View>
                    <View style={{borderColor: '#333334', borderWidth: 1}}>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: 'white'}}>
                          Струм, A
                        </Text>
                      </View>
                      <View style={{margin: 5}}>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[3])}
                        </Text>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[4])}
                        </Text>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[5])}
                        </Text>
                      </View>
                    </View>
                    <View style={{borderColor: '#333334', borderWidth: 1}}>
                      <View style={{margin: 5}}>
                        <Text style={{fontSize: 16, color: 'white'}}>
                          Потужність, кВт
                        </Text>
                      </View>
                      <View style={{margin: 5}}>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[6])}
                        </Text>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[7])}
                        </Text>
                        <Text style={IndexStyle.BottomTitle}>
                          {checkData(jsonFromServerHeater209Time?.so_power2[8])}
                        </Text>
                      </View>
                    </View>
                </View>
              </View>
            </View>
          </Modal>
          </ScrollView>

        </View>
        </LinearGradient>
<Modal
  animationIn="slideInLeft"
  animationOut="slideOutLeft"
  animationInTiming={250}
  animationOutTiming={250}
  onBackdropPress={toggleModalHeader}
  isVisible={isModalVisibleHeader}
  style={{ margin: 0 }}
  backdropOpacity={0.6}
  backdropColor="#000"
>
  <View style={{
    flex: 1,
    backgroundColor: '#121212',
    width: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  }}>
    {/* Header с логотипом */}
    <LinearGradient
      colors={['#1a1a1a', '#222222']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        paddingTop: 50,
        paddingBottom: 24,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
      }}>
      <View style={{ alignItems: 'center' }}>
        <View style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: 'rgba(103, 231, 97, 0.1)',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 12,
        }}>
          <Image 
            source={require('../../../public/images/ASALogo.png')} 
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
          />
        </View>
        <Text style={{
          fontSize: 18,
          color: '#ffffff',
          fontWeight: 'bold',
        }}>
          Система {boilerCode?.boilerCode}
        </Text>
        <Text style={{
          fontSize: 12,
          color: '#aaaaaa',
          marginTop: 4,
        }}>
          Управління опаленням
        </Text>
      </View>
    </LinearGradient>

    {/* Меню */}
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingVertical: 16 }}>
      
      {/* Пункт меню - Пік навантаження */}
      <TouchableOpacity
        onPress={() => {
          setModalVisibleHeader(false);
          navigation.navigate('ПікНавантаження', {
            jsonFromServerHeater209: jsonFromServerHeaterSettings209
          });
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: 20,
          marginHorizontal: 12,
          marginBottom: 4,
          borderRadius: 12,
          backgroundColor: 'transparent',
        }}>
        <View style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: 'rgba(255, 136, 68, 0.1)',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        }}>
          <Image 
            source={require('../../../public/images/bx-trending-up.svg.png')} 
            style={{ width: 20, height: 20, tintColor: '#ff8844' }}
            resizeMode="contain"
          />
        </View>
        <Text style={{
          fontSize: 16,
          color: '#ffffff',
          fontWeight: '500',
        }}>
          Пікові навантаження
        </Text>
      </TouchableOpacity>

      {/* Пункт меню - Порядок Тенів */}
      <TouchableOpacity
        onPress={() => {
          setModalVisibleHeader(false);
          navigation.navigate('ПорядокТенів', {
            jsonFromServerHeater209: jsonFromServerHeater209
          });
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: 20,
          marginHorizontal: 12,
          marginBottom: 4,
          borderRadius: 12,
          backgroundColor: 'transparent',
        }}>
        <View style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: 'rgba(103, 231, 97, 0.1)',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        }}>
          <Image 
            source={require('../../../public/images/componentsIcoWhite.png')} 
            style={{ width: 20, height: 20, tintColor: '#67e761' }}
            resizeMode="contain"
          />
        </View>
        <Text style={{
          fontSize: 16,
          color: '#ffffff',
          fontWeight: '500',
        }}>
          Порядок запуску тенів
        </Text>
      </TouchableOpacity>

      {/* Разделитель */}
      <View style={{
        height: 1,
        backgroundColor: '#333333',
        marginVertical: 16,
        marginHorizontal: 20,
      }} />

      {/* Пункт меню - Выход */}
      <TouchableOpacity
        onPress={() => {
          setModalVisibleHeader(false);
          navigation.navigate('Авторизація');
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: 20,
          marginHorizontal: 12,
          marginBottom: 4,
          borderRadius: 12,
          backgroundColor: 'rgba(255, 68, 68, 0.1)',
        }}>
        <View style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: 'rgba(255, 68, 68, 0.15)',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        }}>
          <Image 
            source={require('../../../public/images/arrow_back.png')} 
            style={{ width: 20, height: 20, tintColor: '#ff4444' }}
            resizeMode="contain"
          />
        </View>
        <Text style={{
          fontSize: 16,
          color: '#ff4444',
          fontWeight: '500',
        }}>
          Вийти
        </Text>
      </TouchableOpacity>
    </ScrollView>

    {/* Footer с версией */}
    <View style={{
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderTopColor: '#222222',
    }}>
      <Text style={{
        fontSize: 11,
        color: '#555555',
        textAlign: 'center',
      }}>
        Версія 1.0.0
      </Text>
    </View>
  </View>
</Modal>
    </View>
  );
};
