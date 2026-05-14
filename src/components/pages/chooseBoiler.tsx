import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Alert,
  AsyncStorage,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {colors} from '../../const/colors';
import {IndexStyle} from './page-styles/index.style';
import LinearGradient from 'react-native-linear-gradient';

// URL вашего API
const API_URL = 'http://asaiot.net/boilersConstructor/api/data.php';

type BoilerSettings = {
  id: string;
  shemaBoiler: string;
  shemaTen: string;
  shemaSensor: string;
  brockerId: string;
  currentDb: string;
  boilerCode: string;
};

// Функция для сохранения данных в одну запись
const saveToStorage = async (data: BoilerSettings) => {
  try {
    await AsyncStorage.setItem('boilerSettings', JSON.stringify(data));
    Alert.alert(
      'Дані збережено',
      `Котел з кодом: ${data.boilerCode} успішно обрано.`,
    );
  } catch (error) {
    Alert.alert('Ошибка', 'Не удалось сохранить данные.');
    console.error(error);
  }
};

// Основной компонент с динамическими кнопками
const ChooseBoiler = () => {
  const navigation = useNavigation();
  const [boilerData, setBoilerData] = useState<BoilerSettings[]>([]);
  const [activeBoilerCode, setActiveBoilerCode] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Функция для получения данных при загрузке компонента
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Загрузка данных из API...');
        const response = await axios.get<BoilerSettings[]>(API_URL);
        console.log('Полученные данные:', response.data);
        
        if (response.data && Array.isArray(response.data)) {
          setBoilerData(response.data);
          console.log('Данные сохранены в state, количество:', response.data.length);
        } else {
          console.error('Неверный формат данных:', response.data);
        }
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        Alert.alert('Ошибка', 'Не удалось загрузить данные.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]);

  const handleFetchAndStore = async (boilerCode: string) => {
    console.log('Выбран boilerCode:', boilerCode);
    console.log('Текущие данные boilerData:', boilerData);
    
    const selectedData = boilerData.find(
      item => item.boilerCode === boilerCode,
    );
    
    console.log('Найденные данные:', selectedData);
    
    setActiveBoilerCode(boilerCode);
    
    if (selectedData) {
      await saveToStorage(selectedData);
    } else {
      console.error(`Запись с boilerCode ${boilerCode} не найдена. Доступные коды:`, 
        boilerData.map(item => item.boilerCode));
      Alert.alert('Ошибка', `Запись с boilerCode ${boilerCode} не найдена.`);
    }
  };
  
  const handleNavigation = () => {
    if (activeBoilerCode) {
      navigation.navigate('Авторизація');
    } else {
      Alert.alert('Увага', 'Будь ласка, оберіть систему опалення');
    }
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      {/* Header */}
      <View style={{ 
        backgroundColor: '#222222', 
        paddingTop: 50,
        paddingBottom: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}>
        <View style={{ alignItems: 'center', paddingHorizontal: 16, marginTop: -40, }}>
          <Text style={{ 
            fontSize: 24, 
            color: '#ffffff', 
            fontWeight: 'bold',
            letterSpacing: 0.5,
          }}>
            Система опалення
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#aaaaaa',
            marginTop: 8,
            textAlign: 'center',
          }}>
            Виберіть ваш котел зі списку нижче
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={{ flex: 1, padding: 16 }}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.lightGreen} />
            <Text style={{ color: '#aaaaaa', marginTop: 16, fontSize: 14 }}>
              Завантаження даних...
            </Text>
          </View>
        ) : boilerData.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              backgroundColor: '#222222',
              borderRadius: 20,
              padding: 32,
              alignItems: 'center',
            }}>
              <Text style={{ fontSize: 18, color: '#ffffff', marginBottom: 16 }}>
                Немає доступних котлів
              </Text>
              <TouchableOpacity onPress={() => setRefresh(prev => prev + 1)}>
                <View style={{
                  backgroundColor: colors.lightGreen,
                  borderRadius: 12,
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                }}>
                  <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                    Оновити
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
              {boilerData.map((item, index) => {
                const isActive = activeBoilerCode === item.boilerCode;
                return (
                  <TouchableOpacity
                    key={item.boilerCode || index}
                    onPress={() => handleFetchAndStore(item.boilerCode)}
                    style={{
                      width: '48%',
                      marginBottom: 12,
                    }}>
                    <LinearGradient
                      colors={isActive ? ['#2a5a2a', '#1a3a1a'] : ['#2a2a2a', '#222222']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        borderRadius: 16,
                        borderWidth: isActive ? 2 : 1,
                        borderColor: isActive ? colors.lightGreen : '#333333',
                        overflow: 'hidden',
                      }}>
                      <View style={{
                        padding: 20,
                        alignItems: 'center',
                      }}>
                        <View style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          backgroundColor: isActive ? 'rgba(103, 231, 97, 0.2)' : '#333333',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 12,
                        }}>
                          <Text style={{
                            fontSize: 24,
                            color: isActive ? colors.lightGreen : '#ffffff',
                            fontWeight: 'bold',
                          }}>
                            {String(item.boilerCode).charAt(0)}
                          </Text>
                        </View>
                        <Text style={{
                          fontSize: 18,
                          color: isActive ? colors.lightGreen : '#ffffff',
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                          {String(item.boilerCode)}
                        </Text>
                        {isActive && (
                          <View style={{
                            backgroundColor: colors.lightGreen,
                            borderRadius: 12,
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            marginTop: 8,
                          }}>
                            <Text style={{
                              fontSize: 10,
                              color: '#222222',
                              fontWeight: 'bold',
                            }}>
                              Обрано
                            </Text>
                          </View>
                        )}
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Нижняя панель с кнопками */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 24,
              marginBottom: 32,
              paddingTop: 16,
              borderTopWidth: 1,
              borderTopColor: '#333333',
            }}>
              <TouchableOpacity
                onPress={() => setRefresh(prev => prev + 1)}
                style={{
                  backgroundColor: '#333333',
                  borderRadius: 50,
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{ width: 24, height: 24, tintColor: '#ffffff' }}
                  source={require('../../../public/images/refresh.jpg')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleNavigation}
                style={{
                  flex: 1,
                  marginLeft: 12,
                }}>
                <LinearGradient
                  colors={activeBoilerCode ? [colors.lightGreen, '#45a845'] : ['#555555', '#444444']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: 12,
                    paddingVertical: 14,
                    alignItems: 'center',
                    opacity: activeBoilerCode ? 1 : 0.6,
                  }}>
                  <Text style={{
                    fontSize: 16,
                    color: '#ffffff',
                    fontWeight: 'bold',
                  }}>
                    Зайти
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default ChooseBoiler;