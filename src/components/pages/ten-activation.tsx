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

// Типизация для route параметров
interface TenActivationProps {
  route?: {
    params?: {
      jsonFromServerHeater209?: {
        so_ten?: (string | number)[];
      };
    };
  };
}

export const TenActivation: React.FC<TenActivationProps> = ({ route }) => {
  // Безопасное получение данных с проверками
  const jsonFromServerHeater209 = route?.params?.jsonFromServerHeater209;
  const navigation = useNavigation();

  // Порядок запуска ТЭНов
  const activationOrder = [1, 11, 2, 12, 13, 3, 14, 4, 7, 17, 8, 18, 10, 20, 0, 0];

  // Вспомогательная функция для рендера элемента ТЭНа
  const renderTenItem = (index: number, label: string, orderNumber: number) => {
    // Проверяем существует ли so_ten и есть ли значение по индексу
    const value = jsonFromServerHeater209?.so_ten?.[index];
    // Если значение существует, показываем его, иначе показываем порядковый номер
    const displayValue = (value !== undefined && value !== null) ? value : orderNumber;
    
    // Определяем цвет для порядкового номера
    const getOrderColor = () => {
      if (orderNumber === 0) return '#666666';
      if (orderNumber <= 5) return '#44ff44'; // Первые 5 - зеленый
      if (orderNumber <= 10) return '#ffaa44'; // С 6 по 10 - оранжевый
      return '#ff8844'; // Остальные - светло-оранжевый
    };

    return (
      <View 
        key={index} 
        style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 12,
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor: '#2a2a2a',
          borderRadius: 12,
          borderLeftWidth: 4,
          borderLeftColor: getOrderColor(),
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: getOrderColor(),
            opacity: orderNumber === 0 ? 0.1 : 0.2,
            marginRight: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ color: getOrderColor(), fontWeight: 'bold', fontSize: orderNumber === 0 ? 12 : 16 }}>
              {orderNumber === 0 ? '✗' : orderNumber}
            </Text>
          </View>
          <View>
            <Text style={[IndexStyle.BottomTitle, { fontSize: 16, color: '#ffffff' }]}>{label}</Text>
            <Text style={{ fontSize: 12, color: '#888888', marginTop: 2 }}>
              {orderNumber === 0 ? 'Не використовується' : `Черга запуску: ${orderNumber}`}
            </Text>
          </View>
        </View>
        <View style={{
          backgroundColor: getOrderColor(),
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
          minWidth: 70,
          alignItems: 'center',
        }}>
          <Text style={{ color: orderNumber === 0 ? '#ffffff' : '#222222', fontWeight: 'bold', fontSize: 18 }}>
            {displayValue}
          </Text>
        </View>
      </View>
    );
  };

  // Массив с именами ТЭНов и порядком запуска
  const tenItems = [
    { label: 'ТЕН 1', order: activationOrder[0] },
    { label: 'ТЕН 2', order: activationOrder[1] },
    { label: 'ТЕН 3', order: activationOrder[2] },
    { label: 'ТЕН 4', order: activationOrder[3] },
    { label: 'ТЕН 5', order: activationOrder[4] },
    { label: 'ТЕН 6', order: activationOrder[5] },
    { label: 'ТЕН 7', order: activationOrder[6] },
    { label: 'ТЕН 8', order: activationOrder[7] },
    { label: 'ТЕН 9', order: activationOrder[8] },
    { label: 'ТЕН 10', order: activationOrder[9] },
    { label: 'ТЕН 11', order: activationOrder[10] },
    { label: 'ТЕН 12', order: activationOrder[11] },
    { label: 'ТЕН 13', order: activationOrder[12] },
    { label: 'ТЕН 14', order: activationOrder[13] },
    { label: 'ТЕН 15', order: activationOrder[14] },
    { label: 'ТЕН 16', order: activationOrder[15] },
  ];

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
            Порядок запуску тенів
          </Text>
        </View>
      </View>
      
      {/* Content */}
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ 
          backgroundColor: '#222222', 
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          flex: 1,
        }}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8 }}
          >
            <View style={{ padding: 16 }}>
              {/* Информационная карточка */}
              <View style={{
                backgroundColor: '#1f1f1f',
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}>
                <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>
                  Порядок запуску
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, width: '48%' }}>
                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#44ff44', marginRight: 6 }} />
                    <Text style={{ color: '#44ff44', fontSize: 12 }}>Черга 1-5</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, width: '48%' }}>
                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#ffaa44', marginRight: 6 }} />
                    <Text style={{ color: '#ffaa44', fontSize: 12 }}>Черга 6-10</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, width: '48%' }}>
                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#ff8844', marginRight: 6 }} />
                    <Text style={{ color: '#ff8844', fontSize: 12 }}>Черга 11+</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, width: '48%' }}>
                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#666666', marginRight: 6 }} />
                    <Text style={{ color: '#666666', fontSize: 12 }}>Не використовується</Text>
                  </View>
                </View>
              </View>
              
              {/* Список ТЭНов */}
              {tenItems.map((item, idx) => renderTenItem(idx, item.label, item.order))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};