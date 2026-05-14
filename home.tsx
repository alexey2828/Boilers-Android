/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {LoadingMessage} from './src/components/messages/loading';
import {BoilersPage} from './src/components/pages/boilers';
import {ListPage} from './src/components/pages/list';
import {MainPage} from './src/components/pages/page-main';
import {ServerInit} from './src/const/user-init';
import {useMqtt} from './src/infrastucture/hooks/use-mqtt';
import {IndexStyle} from './src/components/pages/page-styles/index.style';
import LinearGradient from 'react-native-linear-gradient';

const Home = () => {
  const {
    msgFromTopic1,
    msgFromTopic2,
    msgFromTopic3,
    error,
    onConnect,
    updateResponse,
  } = useMqtt<any>();
  const swiperRef = useRef(null);

  const [pageIndex, setPageIndex] = useState(1);

  const test1 = msgFromTopic1 ? JSON.parse(msgFromTopic1) : null;
  const jsonFromServerHeater209TimeD = test1 ? test1.d : null;

  const test2 = msgFromTopic2 ? JSON.parse(msgFromTopic2) : null;
  const jsonFromServerHeater209D = test2 ? test2.d : null;

  const test3 = msgFromTopic3 ? JSON.parse(msgFromTopic3) : null;
  const jsonFromServerHeater209DSettings = test3 ? test3.d : null;

  const jsonFromServerHeater209 = jsonFromServerHeater209D;
  const jsonFromServerHeater209Time = jsonFromServerHeater209TimeD;
  const jsonFromServerHeater209Settings = jsonFromServerHeater209DSettings;
  
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

  useEffect(() => {
    const timer = setTimeout(() => {
        updateResponse(
          ServerInit.protocol + ServerInit.host + ':' + ServerInit.port,
          'Heater/' + boilerCode?.boilerCode + '/trigger'
        );
        console.log('Heater/' + boilerCode?.boilerCode + '/trigger');
    }, 4000);

    return () => clearTimeout(timer);
}, [boilerCode]);

  console.log('Heater/' + boilerCode?.boilerCode + '/trigger');

  // Обработчик изменения индекса при свайпе
  const handleChangeIndex = ({index}) => {
    setPageIndex(index);
  };

  // Функция для рендера пункта меню
  const renderMenuItem = (index: number, title: string, iconActive: any, iconInactive: any) => {
    const isActive = pageIndex === index;
    
    return (
      <TouchableOpacity
        onPress={() => {
          setPageIndex(index);
          swiperRef.current.scrollToIndex({index: index, animated: true});
        }}
        style={{
          alignItems: 'center',
          flex: 1,
          paddingVertical: 8,
          borderRadius: 25,
          backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          marginHorizontal: 4,
        }}>
        <View style={{
          width: 24,
          height: 24,
          marginBottom: 6,
          opacity: isActive ? 1 : 0.6,
        }}>
          <Image
            style={{width: '100%', height: '100%', tintColor: isActive ? '#ffffff' : '#aaaaaa'}}
            source={isActive ? iconActive : iconInactive}
          />
        </View>
        <Text style={{
          fontSize: 12,
          color: isActive ? '#ffffff' : '#aaaaaa',
          fontWeight: isActive ? '600' : '400',
        }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <SwiperFlatList
          ref={swiperRef}
          autoplay
          autoplayDelay={9999}
          autoplayLoop
          index={pageIndex}
          horizontal
          showPagination={false}
          onChangeIndex={handleChangeIndex} // Добавлен обработчик смены страницы
        >
          <View style={[styles.child, {backgroundColor: '#121212'}]}>
            <BoilersPage
              data={{
                jsonFromServerHeater209Time,
                jsonFromServerHeater209,
                jsonFromServerHeater209Settings,
              }}
              error={error}
              onConnect={onConnect}
            />
          </View>
          <View style={[styles.child, {backgroundColor: '#121212'}]}>
            <MainPage
              data={{
                jsonFromServerHeater209Time,
                jsonFromServerHeater209,
                jsonFromServerHeater209Settings,
                test1,
                test2,
                test3,
              }}
              error={error}
              onConnect={onConnect}
            />
          </View>
          <View style={[styles.child, {backgroundColor: '#121212'}]}>
            <ListPage
              data={{
                jsonFromServerHeater209Time,
                jsonFromServerHeater209,
                jsonFromServerHeater209Settings,
              }}
              error={error}
              onConnect={onConnect}
            />
          </View>
        </SwiperFlatList>
      </View>
      
      {/* Улучшенный футер */}
      <LinearGradient
        colors={['#1a1a1a', '#222222']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          backgroundColor: '#222222',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
          paddingTop: 12,
          paddingBottom: 20,
          paddingHorizontal: 16,
        }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
          {renderMenuItem(
            0, 
            'Котли', 
            require('./public/images/bxs-flame.svg.png'),
            require('./public/images/bxs-flame.svg.png')
          )}
          
          {renderMenuItem(
            1, 
            'Опалення', 
            require('./public/images/home.png'),
            require('./public/images/home.png')
          )}
          
          {renderMenuItem(
            2, 
            'Показники', 
            require('./public/images/bx-grid.svg.png'),
            require('./public/images/bx-grid.svg.png')
          )}
        </View>
        
        {/* Индикатор активной страницы */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          marginBottom: -8,
        }}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={{
                width: pageIndex === index ? 20 : 6,
                height: 4,
                borderRadius: 2,
                backgroundColor: pageIndex === index ? '#ffffff' : '#555555',
                marginHorizontal: 3,
                opacity: pageIndex === index ? 1 : 0.5,
              }}
            />
          ))}
        </View>
      </LinearGradient>
    </>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121212', marginTop: -15},
  child: {width, justifyContent: 'center'},
  text: {fontSize: width * 0.5, textAlign: 'center'},
});

export default Home;