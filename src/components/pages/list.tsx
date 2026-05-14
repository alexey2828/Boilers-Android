/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import { IndexStyle } from './page-styles/index.style';
import { units } from '../../const/units';
import { colors } from '../../const/colors';
import { listPower } from '../../const/lists/list-power';
import { listDegree } from '../../const/lists/list-degree';
import { listAmperage } from '../../const/lists/list-amperage';
import { useNavigation } from '@react-navigation/native';
import DropdownList from '../drop-lists/drop-list';
import { addRandomSensorValuesOffset } from '../../infrastructure/sensor-values/sensor-values';
import LinearGradient from 'react-native-linear-gradient';
export interface IMqttData { data: any }

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

const countActiveTen = (tenValuesData: any) => {
  const parsedTenValues = parseMaybeJson(tenValuesData) || {};

  return Object.keys(parsedTenValues).reduce((count, key) => {
    const valueParamTMP = parsedTenValues[key]?.valueParamTMP;
    return valueParamTMP === '1' || valueParamTMP === 1 ? count + 1 : count;
  }, 0);
};

export const ListPage: React.FC<IMqttData> = ({data}: IMqttData) => {
const navigation = useNavigation();
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
const jsonFromServerHeater209Settings = data?.jsonFromServerHeater209Settings;

const [boilerCode, setBoilerCode] = useState<any>(null);
const [sensorValues, setSensorValues] = useState<Record<string, any> | null>(null);
const [sensorValuesError, setSensorValuesError] = useState<string | null>(null);

const shemaSensor = boilerCode?.shemaSensor ? boilerCode?.shemaSensor : null;
const tenValues = boilerCode?.shemaTen;
const tenValues2 = boilerCode?.shemaTen2;

const activeTenAmperageBoiler1 = countActiveTen(tenValues) * 22;
const activeTenAmperageBoiler2 = countActiveTen(tenValues2) * 22;

    // Загружаем boilerCode из AsyncStorage
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
            setSensorValuesError('Boiler configuration not found');
            return;
          }

          const parsedValues =
            getShemaSensorValues(matched.settings) ||
            getShemaSensorValues(matched) ||
            getShemaSensorValues(jsonFromServerHeater209Settings);

          setSensorValues(parsedValues || null);
          setSensorValuesError(null);
        } catch (error) {
          console.error('Failed to load sensor values:', error);
          setSensorValues(null);
          setSensorValuesError('Ошибка загрузки данных API');
        }
      };

      loadShemaSensorValues();
    }, [boilerCode, jsonFromServerHeater209Settings]);

    useEffect(() => {
      const interval = setInterval(() => {
        setSensorValues(currentSensorValues =>
          addRandomSensorValuesOffset(currentSensorValues),
        );
      }, 30000);

      return () => clearInterval(interval);
    }, []);
    
    function getDesiredIndicesByCategory(shemaSensorSource: any, category: number) {
      if (!shemaSensorSource) {
        return [];
      }

      const schemaSensor =
        typeof shemaSensorSource === 'string'
          ? JSON.parse(shemaSensorSource)
          : shemaSensorSource;
      const desiredIndices = [];
    
      for (const key in schemaSensor) {
        if (schemaSensor.hasOwnProperty(key)) {
          const field = schemaSensor[key];
          
          if (field.category === category) {
            const index = parseInt(key.replace(/\D/g, ""), 10);
            if (!isNaN(index)) {
              desiredIndices.push(index);
            }
          }
        }
      }
    
      desiredIndices.sort((a, b) => a - b);
      return desiredIndices;
    }

// Функция для рендера секции с данными
const renderSection = (title: string, icon: string, children: React.ReactNode) => (
  <View style={{ 
    backgroundColor: '#222222', 
    opacity: 0.9, 
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 16,
    overflow: 'hidden',
  }}>
    <View style={{ 
      padding: 20,
      borderBottomWidth: 2,
      borderBottomColor: '#464646',
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: 'bold', letterSpacing: 0.5 }}>
          {title}
        </Text>
      </View>
    </View>
    <View style={{ padding: 16 }}>
      {children}
    </View>
  </View>
);

return (
    <View style={{marginTop: 15, height: '100%'}}>
      <LinearGradient
        colors={['#90849a', '#7f7bb7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{height: '100%'}}
      >
      
      {/* Content */}
      <View style={{ flex: 1, padding: 16 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Температура */}
          {renderSection('Температура', '🌡️', 
            <>
              <DropdownList 
                time={jsonFromServerHeater209Time?.date_time[0]} 
                title={'Котла'} 
                items={listDegree({jsonFromServerState: jsonFromServerHeater209, schemaSensor: shemaSensor, sensorValues, type: 'T'})} 
                desiredIndices={getDesiredIndicesByCategory(shemaSensor, 1)} 
                unit={units.degrees}
              />
              <DropdownList 
                time={jsonFromServerHeater209Time?.date_time[0]} 
                title={'Колектори'} 
                items={listDegree({jsonFromServerState: jsonFromServerHeater209, schemaSensor: shemaSensor, sensorValues, type: 'T'})} 
                desiredIndices={getDesiredIndicesByCategory(shemaSensor, 2)} 
                unit={units.degrees}
              />
              <DropdownList 
                time={jsonFromServerHeater209Time?.date_time[0]} 
                title={'Контури обігріву'} 
                items={listDegree({jsonFromServerState: jsonFromServerHeater209, schemaSensor: shemaSensor, sensorValues, type: 'T'})} 
                desiredIndices={getDesiredIndicesByCategory(shemaSensor, 3)} 
                unit={units.degrees}
              />
              <DropdownList 
                time={jsonFromServerHeater209Time?.date_time[0]} 
                title={'Зовнішні температури'} 
                items={listDegree({jsonFromServerState: jsonFromServerHeater209, schemaSensor: shemaSensor, sensorValues, type: 'T'})} 
                desiredIndices={getDesiredIndicesByCategory(shemaSensor, 4)} 
                unit={units.degrees}
              />
              <DropdownList 
                time={jsonFromServerHeater209Time?.date_time[0]} 
                title={'Внутрішні температури'} 
                items={listDegree({jsonFromServerState: jsonFromServerHeater209, schemaSensor: shemaSensor, sensorValues, type: 'T'})} 
                desiredIndices={getDesiredIndicesByCategory(shemaSensor, 5)} 
                unit={units.degrees}
              />
            </>
          )}

          {/* Тиск */}
          {renderSection('Тиск', '📊', 
            <DropdownList 
              time={jsonFromServerHeater209Time?.date_time[0]} 
              title={'Тиск'} 
              items={listDegree({jsonFromServerState: jsonFromServerHeater209, schemaSensor: shemaSensor, sensorValues, type: 'P'})} 
              desiredIndices={getDesiredIndicesByCategory(shemaSensor, 6)} 
              unit={units.pressure}
            />
          )}

          {/* Струм */}
          {renderSection('Струм', '⚡', 
            <>
              <DropdownList 
                time={jsonFromServerHeater209Time?.date_time[0]} 
                title={'З Котла 1'} 
                items={listAmperage(jsonFromServerHeater209Time, activeTenAmperageBoiler1, activeTenAmperageBoiler2)} 
                desiredIndices={[1, 2, 3]} 
                unit={units.amperage}
              />
              <DropdownList 
                time={jsonFromServerHeater209Time?.date_time[0]} 
                title={'З Котла 2'} 
                items={listAmperage(jsonFromServerHeater209Time, activeTenAmperageBoiler1, activeTenAmperageBoiler2)} 
                desiredIndices={[4, 5, 6]} 
                unit={units.amperage}
              />
            </>
          )}
        </ScrollView>
      </View>
       </LinearGradient>
    </View>
  );
};
