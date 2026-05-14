/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { colors } from '../../const/colors';
import { IndexStyle } from './page-styles/index.style';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export const PikLoad: React.FC<any> = ({ route }) => {
  const jsonFromServerHeater209 = route?.params?.jsonFromServerHeater209;
  const soWeekPik = Array.isArray(jsonFromServerHeater209?.so_week_pik)
    ? jsonFromServerHeater209.so_week_pik
    : [];
  
  const getValue = (index: number): number => {
    const value = soWeekPik[index];
    return (value !== undefined && value !== null) ? value : 0;
  };
  
  const addLeadingZero = (value?: number) => {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) {
      return '00';
    }
    return numberValue < 10 ? `0${numberValue}` : numberValue;
  };
  
  const navigation = useNavigation();

  // Функция для рендера секции с временными интервалами
  const renderTimeSection = (
    title: string,
    activeIndex: number,
    startHourIndex: number,
    startMinIndex: number,
    endHourIndex: number,
    endMinIndex: number
  ) => {
    const isActive = getValue(activeIndex) === 256;
    
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: isActive ? colors.lightGreen : '#666666',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: isActive ? colors.lightGreen : '#666666',
            opacity: 0.2,
            marginRight: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{
              width: 17,
              height: 17,
              backgroundColor: isActive ? colors.lightGreen : '#666666',
              borderRadius: 50,
            }} />
          </View>
          <Text style={[IndexStyle.BottomTitle, { fontSize: 16, color: '#ffffff' }]}>
            {title}
          </Text>
        </View>
        <View style={{
          backgroundColor: isActive ? colors.lightGreen : '#555555',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
          minWidth: 120,
          alignItems: 'center',
        }}>
          <Text style={{ 
            color: isActive ? '#222222' : '#ffffff', 
            fontWeight: 'bold', 
            fontSize: 14 
          }}>
            {addLeadingZero(getValue(startHourIndex))}:{addLeadingZero(getValue(startMinIndex))} - {addLeadingZero(getValue(endHourIndex))}:{addLeadingZero(getValue(endMinIndex))}
          </Text>
        </View>
      </View>
    );
  };

  // Функция для рендера дня недели
  const renderDayItem = (
    dayName: string,
    activeIndex: number,
    startHourIndex: number,
    startMinIndex: number,
    endHourIndex: number,
    endMinIndex: number
  ) => {
    const isActive = getValue(activeIndex) === 256;
    
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: isActive ? colors.lightGreen : '#666666',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: isActive ? colors.lightGreen : '#666666',
            opacity: 0.2,
            marginRight: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{
              width: 17,
              height: 17,
              backgroundColor: isActive ? colors.lightGreen : '#666666',
              borderRadius: 50,
            }} />
          </View>
          <Text style={[IndexStyle.BottomTitle, { fontSize: 16, color: '#ffffff' }]}>
            {dayName}
          </Text>
        </View>
        <View style={{
          backgroundColor: isActive ? colors.lightGreen : '#555555',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
          minWidth: 130,
          alignItems: 'center',
        }}>
          <Text style={{ 
            color: isActive ? '#222222' : '#ffffff', 
            fontWeight: 'bold', 
            fontSize: 14 
          }}>
            {addLeadingZero(getValue(startHourIndex))}:{addLeadingZero(getValue(startMinIndex))} - {addLeadingZero(getValue(endHourIndex))}:{addLeadingZero(getValue(endMinIndex))}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      {/* Header */}
      <View style={{ 
        backgroundColor: '#222222', 
        paddingTop: 50,
        paddingBottom: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: -40, }}>
          <TouchableOpacity 
            onPress={() => { navigation.navigate('Котли'); }}
            style={{
              backgroundColor: colors.darkGray,
              borderRadius: 30,
              width: 44,
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
          <Image 
            source={require('../../../public/images/arrow_back.png')} 
            style={{ width: 20, height: 20, tintColor: '#e0d8d8' }}
            resizeMode="contain"
          />        
          </TouchableOpacity>
          <Text style={{ 
            fontSize: 22, 
            color: 'white', 
            marginLeft: 16,
            fontWeight: 'bold',
            letterSpacing: 0.5,
          }}>
            Пікові навантаження
          </Text>
        </View>
      </View>
      
      {/* Content */}
      <View style={{ flex: 1, padding: 4 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Секция: Тиждень */}
          <View style={{ 
            backgroundColor: '#222222', 
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            marginBottom: 16,
            overflow: 'hidden',
          }}>
            <View style={{ padding: 20 }}>
              <Text style={{ 
                fontSize: 18, 
                color: '#ffffff', 
                fontWeight: 'bold',
                marginBottom: 16,
                letterSpacing: 0.5,
              }}>
                Тиждень
              </Text>
              
              {renderTimeSection('Ранкові:', 0, 1, 2, 3, 4)}
              {renderTimeSection('Вечірні:', 5, 6, 7, 8, 9)}
            </View>
          </View>

          {/* Секция: Теплове споживання */}
          <View style={{ 
            backgroundColor: '#222222', 
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            marginBottom: 16,
            overflow: 'hidden',
          }}>
            <View style={{ padding: 20 }}>
              <Text style={{ 
                fontSize: 18, 
                color: '#ffffff', 
                fontWeight: 'bold',
                marginBottom: 16,
                letterSpacing: 0.5,
              }}>
                Теплове споживання в залежності від часу доби
              </Text>
              
              {/* Информационная карточка с легендой */}
              <View style={{
                backgroundColor: '#1f1f1f',
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                    <View style={{ width: 17, height: 17, backgroundColor: colors.lightGreen, borderRadius: 50, marginRight: 8 }} />
                    <Text style={{ color: colors.lightGreen, fontSize: 12 }}>Активне</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 17, height: 17, backgroundColor: '#666666', borderRadius: 50, marginRight: 8 }} />
                    <Text style={{ color: '#aaaaaa', fontSize: 12 }}>Неактивне</Text>
                  </View>
                </View>
              </View>
              
              {renderDayItem('Понеділок:', 15, 16, 17, 18, 19)}
              {renderDayItem('Вівторок:', 20, 21, 22, 23, 24)}
              {renderDayItem('Середа:', 25, 26, 27, 28, 29)}
              {renderDayItem('Четвер:', 30, 31, 32, 33, 34)}
              {renderDayItem('П\'ятниця:', 35, 36, 37, 38, 39)}
              {renderDayItem('Субота:', 40, 41, 42, 43, 44)}
              {renderDayItem('Неділя:', 10, 11, 12, 13, 14)}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};