/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { colors } from './src/const/colors';
import { IndexStyle } from './src/components/pages/page-styles/index.style';
import { LoadingMessage } from './src/components/messages/loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 50,
      color: 'white',
    },
    slider: {
      width: '100%',
      height: 40,
    },
  });

export const GraphicsScreen = ({ route }) => {

const { title } = route.params;
const { minute } = route.params;

const slideValue1 = 960;// - 90;
const slideValue2 = 720;// - 90;
const slideValue3 = 480;// - 90;
const slideValue4 = 240;// - 90;

const [apiData2, setApiData2] = useState<any>();
const [timeList, setTimeList] = useState([]);
const [offset, setOffset] = useState<number>(0);
const [offsetValue, setOffsetValue] = useState(0);
const [offsetMin, setOffsetMin] = useState<number>(0);

const currentHour = new Date().getHours(); //для норм графика
const [timeOffset, setTimeOffset] = useState<number>(currentHour);

const navigation = useNavigation();

const [timeDotsLength, setTimeDotsLength] = useState<number>(8);

const [sliderValue, setSliderValue] = useState(slideValue1);

const getScreenSize = () => {
  return Dimensions.get('window');
};

const [screenWidth, setScreenWidth] = useState(getScreenSize().width);
const [screenHeight, setScreenHeight] = useState(getScreenSize().height);

const handleSliderChange = (value: React.SetStateAction<number>) => {
  setSliderValue(value);
};

useEffect(() => {
  const hoursList = Array.from({ length: timeDotsLength ? timeDotsLength : 8 }, (_, i) => timeOffset - i - 1).reverse();
  const formattedHoursList = hoursList.map(hour => {
    const date = new Date();
    date.setHours(hour);
    const formattedHour = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    return `${formattedHour}:00`;
  });
  setTimeList(formattedHoursList);
}, [timeOffset, timeDotsLength]);

function getData() {
    return (
      fetch('https://asaengineering28.com/Boilers_39/apiFilter.php' + '?limit=' + (sliderValue ? sliderValue : slideValue1) + '&offset=' + (offsetValue) + '&fieldName=' + '*' + '&minute=' + (minute ? minute : 0))
        .then(response => response.json())
        .then(json => {
          console.log('API Response:', json); // Log the respon
          const apiParamsReverse = json.Params.reverse();
          apiParamsReverse.shift();
          setApiData2(apiParamsReverse);
          return json;
        })
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .catch(error => {
          console.error(error);
        })
    );
}

useEffect(() => {
  if (sliderValue === slideValue1){
    setTimeDotsLength(8);
  }
  if (sliderValue === slideValue2){
    setTimeDotsLength(6);
  }
  if (sliderValue === slideValue3){
    setTimeDotsLength(4);
  }  if (sliderValue === slideValue4){
    setTimeDotsLength(2);
  }
  if (offsetValue >= 0){
    getData();
  }
}, [sliderValue]);

useEffect(() => {
  if (offsetValue >= 0){
    getData();
  }
}, [offsetValue]);

useEffect(() => {
  setOffsetValue(offsetValue - sliderValue);
  setTimeOffset(timeOffset + timeDotsLength);
}, [offsetMin]);

useEffect(() => {
  setOffsetValue(offsetValue + sliderValue);
  setTimeOffset(timeOffset - timeDotsLength);
}, [offset]);

useEffect(() => {
  UpdateGraphic();
}, []);

console.log('https://asaengineering28.com/Boilers_39/apiFilter.php' + '?limit=' + (sliderValue ? sliderValue : slideValue1) + '&offset=' + offsetValue + '&hour=10' + '&fieldName=' + '*' + '&minute=' + minute ? minute : 0)
const UpdateGraphic = () => {
  setOffsetValue(0);
  setSliderValue(slideValue1);
  setTimeOffset(currentHour);
};

useEffect(() => {
  const updateScreenSize = () => {
    setScreenWidth(Dimensions.get('window').width);
    setScreenHeight(Dimensions.get('window').height);
  };
  const subscription = Dimensions.addEventListener('change', updateScreenSize);
  return () => subscription.remove();
}, []);

const chooseData = () => {
  return (title === 'T1' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T1)) ||
  title === 'T2' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T2)) ||
  title === 'T3' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T3)) ||
  title === 'T4' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T4)) ||
  title === 'T5' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T5)) ||
  title === 'T6' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T6)) ||
  title === 'T7' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T7)) ||
  title === 'T8' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T8)) ||
  title === 'T9' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T9)) ||
  title === 'T10' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T10)) ||
  title === 'T11' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T11)) ||
  title === 'T12' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T12)) ||
  title === 'T13' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T13)) ||
  title === 'T14' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T14)) ||
  title === 'T15' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T15)) ||
  title === 'T16' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T16)) ||
  title === 'T17' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T17)) ||
  title === 'T18' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T18)) ||
  title === 'T19' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T19)) ||
  title === 'T20' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T20)) ||
  title === 'T21' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T21)) ||
  title === 'T22' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T22)) ||
  title === 'P1' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.P1)) ||
  title === 'P2' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.P2)) ||
  title === 'P3' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.P3)) ||
  title === 'P4' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.P4)) ||
  title === 'L1_1' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.L1_1)) ||
  title === 'L1_2' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.L1_2)) ||
  title === 'L1_3' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.L1_3)) ||
  title === 'L2_1' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.L2_1)) ||
  title === 'L2_2' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.L2_2)) ||
  title === 'L2_3' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.L2_3)) ||
  title === 'PH1_F' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.PH1_F)) ||
  title === 'PH2_F' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.PH2_F)) ||
  title === 'T5_T12' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.T5_T12)) ||
  title === 'P2_P3' && apiData2 && apiData2?.map((param: { d: any; }) => String(param.d.P2_P3)));
};

const chooseDataDate = () => {
  if (!apiData2) {
    return [];
  }

  const filteredDates = apiData2
    .map((param: { d: any; }) => String(param.d.date_time))
    .filter((date, index, array) => {
      if (index === 0) {
        return true; // Include the first date
      } else {
        const prevHour = new Date(array[index - 1]).getHours();
        const currentHour = new Date(date).getHours();
        return prevHour !== currentHour;
      }
    });
    console.log(filteredDates)

    const convertTimeFormat = (timeArray) => {
      const formattedTimes = timeArray.map((timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      });

      return formattedTimes;
    };

  return convertTimeFormat(filteredDates);
};

console.log('-->>>', 'https://asaengineering28.com/Boilers_39/apiFilter.php' + '?limit=' + (sliderValue ? sliderValue : slideValue1) + '&offset=' + (offsetValue) + '&fieldName=' + '*' + '&minute=' + (minute ? minute : 0))
return (
  <GestureHandlerRootView>

    <View>
      {!chooseData() ? <LoadingMessage /> : null}
      <View style={{backgroundColor: '#242424', borderRadius: 10}}>
        <View style={{marginTop: -10}}>
          <View
            style={{
              backgroundColor: colors.gray,
              marginLeft: -10,
              marginRight: -10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomColor: '#4e4e50',
              borderWidth: 1,
            }}>
            <View style={IndexStyle.RowFlexStart}>
              <TouchableOpacity
                onPress={() => {navigation.navigate('Котли')}}
              >
                <View style={{ borderRadius: 50, backgroundColor: colors.darkGray, marginTop: 20, marginLeft: 15}}>
                  <Text style={{fontSize: 20, color: colors.lightGray, margin: 10}}>{'  <  '}</Text>
                </View>
              </TouchableOpacity>
              <Text style={{fontSize: 20, color: 'white', margin: 20, marginTop: 30}}>
                Графік {title} за останні {timeDotsLength} год.
              </Text>
              </View>
          </View>
          <ScrollView style={{height: '100%'}}>
            <View style={{height: 1200}}>
              <View
                style={{
                  width: '100%',
                  margin: 15,
                  marginRight: -5,
                }}>
                <LineChart
                  withDots={false}
                  data={{
                    labels: chooseDataDate() ? chooseDataDate() : [0],
                    datasets: [
                      {
                        data: chooseData() ? chooseData() : [0, 0, 0, 0, 0],
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      },
                    ],
                  }}
                  width={screenWidth}
                  height={screenHeight / 2}
                  xLabelsOffset={20}
                  segments={2}
                  verticalLabelRotation={270}
                  chartConfig={{
                    backgroundColor: '#242424',
                    backgroundGradientFrom: '#242424',
                    backgroundGradientTo: '#242424',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 10,
                    },
                   strokeWidth: 2,
                  }}
                  bezier
                  style={{
                    width: '80%',
                    marginVertical: 8,
                    borderRadius: 10,
                    marginLeft: -25,
                  }}
                />

              </View>
              <View style={IndexStyle.Row}>
                <Button
                  color={colors.darkGray}
                  onPress={() => setOffset(offsetValue + 1)}
                  title="< Назад"
                />
                <Button
                  color={colors.darkGray}
                  onPress={() => UpdateGraphic()}
                  title="Оновити"
                />
                {offsetValue && offsetValue >= 481 - 80 ? (
                  <Button
                    color={colors.darkGray}
                    onPress={() => setOffsetMin(offsetValue + 1)}
                    title="Вперед >"
                  />
                ) : null}
              </View>
              <Slider
                style={styles.slider}
                minimumValue={slideValue4}
                maximumValue={slideValue1}
                step={slideValue4}
                onValueChange={value => handleSliderChange(value)}
                value={sliderValue}
              />
              <View style={IndexStyle.RowFlexSpaceBetween}>
                <Text style={IndexStyle.BottomTitle}>2 год.</Text>
                <Text style={IndexStyle.BottomTitle}>4 год.</Text>
                <Text style={IndexStyle.BottomTitle}>6 год.</Text>
                <Text style={IndexStyle.BottomTitle}>8 год.</Text>
              </View>
          </View>
        </ScrollView>
        </View>
      </View>
    </View>
    </GestureHandlerRootView>
  );
};


