/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IndexStyle} from './page-styles/index.style';
import {colors} from '../../const/colors';

const Login = () => {
  const [data, setData] = useState<any[]>([]);
  const [login, setLogin] = useState<null | any>(null);
  const [serverUrl, setServerUrl] = useState(
    'http://asaiot.net/boilersConstructor/',
  );
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [boilerCode, setBoilerCode] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevValue => !prevValue);
  };

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

  // Выполняем fetchData только после того, как boilerCode установлен
  useEffect(() => {
    if (boilerCode) {
      fetchData();
    }
  }, [boilerCode]);

  useEffect(() => {
    const getLoginFromLocalStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('login');
        if (value !== null) {
          setLogin(value);
        }
      } catch (error) {
        console.error('Error getting login from local storage:', error);
      }
    };
    getLoginFromLocalStorage();

    const getPasswordFromLocalStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('password');
        if (value !== null) {
          setPassword(value);
        }
      } catch (error) {
        console.error('Error getting login from local storage:', error);
      }
    };
    getPasswordFromLocalStorage();
    const getServerUrlFromLocalStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('serverUrl');
        if (value !== null) {
          setServerUrl(value);
        }
      } catch (error) {
        console.error('Error getting serverUrl from local storage:', error);
      }
    };
    getServerUrlFromLocalStorage();
  }, []);

  useEffect(() => {
    fetchData();
  }, [serverUrl]);

  const fetchData = async () => {
    try {
      const response = await fetch(boilerCode?.usersApi);
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveLoginToLocalStorage = async (value: string) => {
    try {
      await AsyncStorage.setItem('login', value);
    } catch (error) {
      console.error('Error saving login to local storage:', error);
    }
  };

  const savePasswordToLocalStorage = async (value: string) => {
    try {
      await AsyncStorage.setItem('password', value);
    } catch (error) {
      console.error('Error saving login to local storage:', error);
    }
  };

  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.navigate('Котли');
  };

  const saveRoleToLocalStorage = async (value: string) => {
    try {
      await AsyncStorage.setItem('role', value);
    } catch (error) {
      console.error('Error saving role to local storage:', error);
    }
  };

  const handleLogin = () => {
    const user = data.find(item => item.login === login);
    if (user && user.password === password) {
      setLoading(true);
      saveLoginToLocalStorage(login);
      savePasswordToLocalStorage(password);
      saveRoleToLocalStorage(user.role);
      setTimeout(() => {
        setLoading(false);
        handleNavigation();
      }, 1000);
    } else {
      setErrorMessage('Логін, або пароль введені неправильно');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#121212' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
          {/* Логотип и заголовок */}
          <View style={{ alignItems: 'center', marginBottom: 48 }}>
            <LinearGradient
              colors={['#2a2a2a', '#222222']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 16,
              }}>
              <Image
                source={require('../../../public/images/ASALogo.png')}
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
              />
            </LinearGradient>
            <Text style={{
              fontSize: 28,
              color: '#ffffff',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
              Вхід в систему
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#aaaaaa',
              marginTop: 8,
              textAlign: 'center',
            }}>
              Система опалення {boilerCode?.boilerCode}
            </Text>
          </View>

          {/* Форма входа */}
          <View style={{ marginBottom: 24 }}>
            {/* Поле логин */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{
                fontSize: 14,
                color: '#ffffff',
                marginBottom: 8,
                fontWeight: '500',
              }}>
                Логін
              </Text>
              <View style={{
                backgroundColor: '#222222',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#333333',
                overflow: 'hidden',
              }}>
                <TextInput
                  style={{
                    padding: 16,
                    fontSize: 16,
                    color: '#ffffff',
                  }}
                  value={login}
                  onChangeText={setLogin}
                  placeholder="Введіть телефон або email..."
                  placeholderTextColor="#666666"
                />
              </View>
            </View>

            {/* Поле пароль */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{
                fontSize: 14,
                color: '#ffffff',
                marginBottom: 8,
                fontWeight: '500',
              }}>
                Пароль
              </Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#222222',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#333333',
                overflow: 'hidden',
              }}>
                <TextInput
                  style={{
                    flex: 1,
                    padding: 16,
                    fontSize: 16,
                    color: '#ffffff',
                  }}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Введіть пароль..."
                  placeholderTextColor="#666666"
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={{ padding: 12 }}>
                  <Image
                    source={require('../../../public/images/hide.png')}
                    style={{ width: 24, height: 24, tintColor: '#aaaaaa' }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Ошибка */}
            {errorMessage ? (
              <View style={{
                backgroundColor: 'rgba(255, 68, 68, 0.1)',
                borderRadius: 12,
                padding: 12,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: '#ff4444',
              }}>
                <Text style={{
                  fontSize: 14,
                  color: '#ff4444',
                  textAlign: 'center',
                }}>
                  {errorMessage}
                </Text>
              </View>
            ) : null}

            {/* Кнопка входа */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={!(login && password) || loading}
              style={{ opacity: (login && password && !loading) ? 1 : 0.6 }}>
              <LinearGradient
                colors={['#BB86FC', '#BB86FC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: 'center',
                }}>
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={{
                    fontSize: 16,
                    color: '#ffffff',
                    fontWeight: 'bold',
                  }}>
                    Увійти
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Дополнительная информация */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
          }}>
            <View style={{
              flex: 1,
              height: 1,
              backgroundColor: '#333333',
            }} />
            <Text style={{
              color: '#666666',
              marginHorizontal: 16,
              fontSize: 12,
            }}>
              Система управління опаленням
            </Text>
            <View style={{
              flex: 1,
              height: 1,
              backgroundColor: '#333333',
            }} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;