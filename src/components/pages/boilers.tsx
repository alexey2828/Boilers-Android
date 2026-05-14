/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Alert,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import SwitchToggle from 'react-native-switch-toggle';
import AnimatedColorView from 'react-native-animated-colors';
import { IMqttData } from './list';
import { colors } from '../../const/colors';
import { IndexStyle } from './page-styles/index.style';
import { listTenOne } from '../../const/list-ten-one';
import { units } from '../../const/units';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { checkData } from '../../infrastructure/check-data/check-data-field';
import { addRandomSensorValuesOffset } from '../../infrastructure/sensor-values/sensor-values';

const { width } = Dimensions.get('window');

export const BoilersPage: React.FC<IMqttData> = ({data}: IMqttData) => {
  const defaultJsonFromServerHeater209Time = {
    so_AI: Array(40).fill(0),
    so_power1: Array(9).fill(0),
    so_power2: Array(9).fill(0),
    controlT: [0],
    date_time: [0, 0],
  } as any;
  const defaultJsonFromServerHeater209 = {
    TS_ComSC_General: 0,
    so_semi_aut: [0, 0, 0],
    so_aut_air: [0, 0, 0],
    so_aut_innerT: [0, 0, 0],
    so_TS_ST: [],
    so_BH: [],
    so_TP_ST: Array(40).fill(0),
    date_time: [0, 0],
  } as any;

  const jsonFromServerHeater209Time =
    data?.jsonFromServerHeater209Time || defaultJsonFromServerHeater209Time;
  const jsonFromServerHeater209 =
    data?.jsonFromServerHeater209 || defaultJsonFromServerHeater209;
  
  const [accidentToggle, setAccidentToggle] = useState(true);
  const [boilerCode, setBoilerCode] = useState<any>(null);
  const [sensorValuesError, setSensorValuesError] = useState<string | null>(null);

  const [isModalVisibleStateHeat, setModalVisibleStateHeat] = useState(false);
  const [isModalVisibleWaterSupply, setModalVisibleWaterSupply] = useState(false);
  const [isModalVisibleTenOne, setModalVisibleTenOne] = useState(false);
  const [isModalVisibleTenTwo, setModalVisibleTenTwo] = useState(false);
  
  const [sensorValues, setSensorValues] = useState<Record<string, any> | null>(null);

  // Функции для переключения модальных окон
  const toggleModalStateHeat = (): void => {
    setModalVisibleStateHeat(!isModalVisibleStateHeat);
  };

  const toggleModalWaterSupply = (): void => {
    setModalVisibleWaterSupply(!isModalVisibleWaterSupply);
  };

  const toggleModalTenOne = (): void => {
    setModalVisibleTenOne(!isModalVisibleTenOne);
  };

  const toggleModalTenTwo = (): void => {
    setModalVisibleTenTwo(!isModalVisibleTenTwo);
  };

  const getSensorValue = (key: string, fallbackValue?: any) => {
    const valueParamTMP = sensorValues?.[key]?.valueParamTMP ?? sensorValues?.[key];
    const value = valueParamTMP !== undefined ? Number(valueParamTMP) : Number(fallbackValue);
    return checkData(Number.isNaN(value) ? undefined : value);
  };
  
  const tenValues = boilerCode?.shemaTen;
  const tenValues2 = boilerCode?.shemaTen2;

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
      if (!boilerCode) return;
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
        const items = Array.isArray(result) ? result : Array.isArray(result?.value) ? result.value : [result];
        const matched = items.find((item: any) => String(item.boilerCode) === String(selectedBoilerCode));

        if (!matched) {
          setSensorValues(null);
          setSensorValuesError('Boiler configuration not found');
          return;
        }

        const parsedValues = getShemaSensorValues(matched.settings) || getShemaSensorValues(matched);
        setSensorValues(parsedValues || null);
        setSensorValuesError(null);
      } catch (error) {
        console.error('Failed to load sensor values:', error);
        setSensorValues(null);
        setSensorValuesError('Ошибка загрузки данных API');
      }
    };
    loadShemaSensorValues();
  }, [boilerCode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorValues(currentSensorValues => addRandomSensorValuesOffset(currentSensorValues));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  function pairSwap(array: any[]) {
    let swappedArray = [];
    for (let i = 0; i < array.length; i += 2) {
      if (i + 1 < array.length) {
        swappedArray.push(array[i + 1], array[i]);
      } else {
        swappedArray.push(array[i]);
      }
    }
    return swappedArray;
  }

  const getTenColors = (tenValuesData: any, tenId: number) => {
    const parsedTenValues = typeof tenValuesData === 'string' ? JSON.parse(tenValuesData || '{}') : tenValuesData || {};
    const valueParamTMP = parsedTenValues[`Ten${tenId}`]?.valueParamTMP;
    return valueParamTMP === '1' || valueParamTMP === 1 ? ['#67E761', colors.green] : [colors.gray, colors.gray];
  };

  // Компонент карточки котла
  const BoilerCard = ({ title, tempValue, onPress, tenData, isSecond }: any) => (
    <View style={{ width: '49.5%' }}>
      <View style={{
        backgroundColor: '#222222',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden',
      }}>
        <LinearGradient
          colors={['#2a2a2a', '#222222']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: 'bold' }}>{title}</Text>
            <View style={{
              backgroundColor: '#333333',
              borderRadius: 12,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}>
              <Text style={{ fontSize: 12, color: '#67E761' }}>Активний</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#ff4444',
              opacity: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12,
            }}>
              <Text style={{ fontSize: 20, color: '#ff4444', fontWeight: 'bold' }}>T</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, color: '#aaaaaa' }}>Температура</Text>
              <Text style={{ fontSize: 24, color: '#ffffff', fontWeight: 'bold' }}>
                {tempValue}{units.degrees}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={onPress}>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
              {pairSwap(listTenOne(jsonFromServerHeater209, tenData))
                .reverse()
                .map((item, index) => (
                  <AnimatedColorView
                    key={item.id}
                    activeIndex={0}
                    colors={getTenColors(tenData, item.id)}
                    duration={1500}
                    loop={true}
                    style={{
                      width: index % 2 === 0 
                        ? `${Math.min(parseFloat(item.width), 48)}%`
                        : `${Math.max(parseFloat(item.width), 25)}%`,
                      marginBottom: 10,
                      borderRadius: 12,
                      overflow: 'hidden',
                    }}>
                    <View style={{
                      width: '100%', 
                      height: 60, 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      borderColor: item.isError, 
                      borderWidth: 2,
                      borderRadius: 12,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                    }}>
                      <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: 'bold' }}>
                        {item.id}
                      </Text>
                    </View>
                  </AnimatedColorView>
                ))}
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );

  // Компонент модального окна
  const CustomModal = ({ isVisible, onClose, title, subtitle, children }: any) => (
    <Modal
      animationInTiming={200}
      animationOutTiming={200}
      onBackdropPress={onClose}
      isVisible={isVisible}
      style={{ margin: 20 }}>
      <View style={{
        backgroundColor: '#222222',
        borderRadius: 25,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
      }}>
        <LinearGradient
          colors={['#2a2a2a', '#222222']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ fontSize: 22, color: '#ffffff', fontWeight: 'bold' }}>{title}</Text>
              <TouchableOpacity onPress={onClose}>
                <View style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: '#333333',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{ fontSize: 18, color: '#ffffff' }}>✕</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 14, color: '#aaaaaa', marginBottom: 16 }}>{subtitle}</Text>
            <View style={{
              height: 1,
              backgroundColor: '#333333',
              marginVertical: 16,
            }} />
            {children}
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );

  // Модальное окно для ТЭНов
  const TenModal = ({ isVisible, onClose, powerData }: any) => (
    <CustomModal isVisible={isVisible} onClose={onClose} title="Параметри роботи" subtitle="Напруга, струм та потужність">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {[
          { title: 'Напруга, V', data: [powerData?.[0], powerData?.[1], powerData?.[2]], color: '#ff8844' },
          { title: 'Струм, A', data: [powerData?.[3], powerData?.[4], powerData?.[5]], color: '#44ff44' },
          { title: 'Потужність, кВт', data: [powerData?.[6], powerData?.[7], powerData?.[8]], color: '#44aaff' },
        ].map((section, idx) => (
          <View key={idx} style={{
            flex: 1,
            backgroundColor: '#1f1f1f',
            borderRadius: 12,
            marginHorizontal: 4,
            overflow: 'hidden',
          }}>
            <View style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#333333' }}>
              <Text style={{ fontSize: 14, color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>
                {section.title}
              </Text>
            </View>
            <View style={{ padding: 12 }}>
              {section.data.map((value: any, i: number) => (
                <Text key={i} style={{
                  fontSize: 18,
                  color: section.color,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginVertical: 4,
                }}>
                  {checkData(value)}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </CustomModal>
  );

  return (
        <View style={{marginTop: 15, height: '100%'}}>
          <LinearGradient
            colors={['#90849a', '#7f7bb7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{height: '100%'}}
          >
          
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16, paddingTop: 20 }}>
          {/* Заголовок секции */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ 
                backgroundColor: '#222222', 
                opacity: 0.9, 
                borderRadius: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                marginBottom: -5,
                overflow: 'hidden',
              }}>
                <View style={{ 
                  padding: 15,
                  borderBottomWidth: 2,
                  borderBottomColor: '#464646',
                  paddingTop: 10
                }}>
            <Text style={{ fontSize: 24, color: '#ffffff', fontWeight: 'bold', letterSpacing: 0.5 }}>
              Опалення
            </Text>
                      <Text style={{ fontSize: 14, color: '#aaaaaa', marginTop: 0 }}>
              Управління та контроль котлів
            </Text>
            </View>
            </View>
  
          </View>

          {/* Карточки котлов */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <BoilerCard
              title="Котел 1"
              tempValue={getSensorValue('T1', jsonFromServerHeater209Time?.so_AI[1])}
              onPress={toggleModalTenOne}
              tenData={tenValues}
            />
            <BoilerCard
              title="Котел 2"
              tempValue={getSensorValue('T2', jsonFromServerHeater209Time?.so_AI[2])}
              onPress={toggleModalTenTwo}
              tenData={tenValues2}
            />
          </View>
        </View>
      </ScrollView>

      {/* Модальные окна */}
      <TenModal
        isVisible={isModalVisibleTenOne}
        onClose={toggleModalTenOne}
        powerData={jsonFromServerHeater209Time?.so_power1}
      />

      <TenModal
        isVisible={isModalVisibleTenTwo}
        onClose={toggleModalTenTwo}
        powerData={jsonFromServerHeater209Time?.so_power2}
      />

      {/* Модальное окно состояний */}
      <CustomModal
        isVisible={isModalVisibleStateHeat}
        onClose={toggleModalStateHeat}
        title="Стани"
        subtitle="Стани котлів та насосів системи опалення">
        <View>
          <Text style={{ color: '#aaaaaa', textAlign: 'center' }}>Информация о состояниях</Text>
        </View>
      </CustomModal>

      {/* Модальное окно водоснабжения */}
      <CustomModal
        isVisible={isModalVisibleWaterSupply}
        onClose={toggleModalWaterSupply}
        title="Водопостачання"
        subtitle="Стани системи гарячого водопостачання">
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 18, color: accidentToggle ? '#67E761' : '#ff4444', fontWeight: 'bold' }}>
                {accidentToggle ? 'Працює' : 'Зупинено'}
              </Text>
              <Text style={{ fontSize: 14, color: '#aaaaaa' }}>Аварія стоп</Text>
            </View>
            <SwitchToggle
              switchOn={accidentToggle}
              onPress={() => setAccidentToggle(!accidentToggle)}
              circleColorOff="#C4C4C4"
              circleColorOn="#67E761"
              backgroundColorOn="#6D6D6D"
              backgroundColorOff="#4F4F4F"
              containerStyle={{
                width: 70,
                height: 38,
                borderRadius: 25,
                padding: 5,
              }}
              circleStyle={{
                width: 30,
                height: 30,
                borderRadius: 20,
              }}
            />
          </View>
        </View>
      </CustomModal>
           </LinearGradient>
        </View>
  );
};