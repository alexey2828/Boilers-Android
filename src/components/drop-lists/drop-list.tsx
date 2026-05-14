/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Animated, Image} from 'react-native';
import {IndexStyle} from '../pages/page-styles/index.style';
import {useNavigation} from '@react-navigation/native';

const DropdownList = ({title, items, desiredIndices, unit, time}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  return (
    <>
      <View
        style={{
          backgroundColor: '#222222',
          opacity: 0.9,
          marginTop: 15,
          borderRadius: 10,
        }}>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <View
            style={{
              margin: 10,
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
            }}>
            {isOpen ? (
              <Image
                style={{
                  width: 11,
                  height: 8,
                  marginTop: 10,
                  opacity: 0.6,
                  marginLeft: 5,
                }}
                source={require('../../../public/images/arrow.png')}
              />
            ) : (
              <Image
                style={{
                  width: 8,
                  height: 10,
                  marginTop: 8,
                  opacity: 0.6,
                  marginLeft: 5,
                }}
                source={require('../../../public/images/arrow-right.png')}
              />
            )}
            <Text
              style={[IndexStyle.TopTitle, {marginLeft: 10, marginTop: -4}]}>
              {title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {isOpen ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            margin: 0,
          }}>
          {items.map(item => {
            if (desiredIndices.includes(item.id) && item.title !== '-') {
              // Проверка по id и title
              return (
                <View style={{width: '50%'}} key={item.id}>
                  <View
                    style={{
                      backgroundColor: item.isError ? '#760000' : '#222222',
                      opacity: 0.9,
                      margin: 2,
                      borderRadius: 10,
                      flex: 1,
                      alignItems: 'center',
                      marginTop: 2,
                    }}>
                    <View>
                      <Text
                        style={[
                          IndexStyle.BottomTitle,
                          {marginTop: 10, fontSize: 20},
                        ]}>
                        {item.graph}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 35,
                        marginTop: 5,
                        textDecorationLine: item.isError
                          ? 'line-through'
                          : 'none',
                      }}>
                      {item.value ? item.value : 0}
                      {unit}
                    </Text>
                    <View
                      style={{
                        width: '40%',
                        height: 5,
                        backgroundColor: item.borderColor,
                        marginTop: 5,
                      }}></View>
                    <Text
                      style={[
                        IndexStyle.BottomTitle,
                        {marginTop: 10, fontSize: 20, width: '85%'},
                      ]}>
                      {item.title}
                    </Text>
                    <View style={{height: 20}}></View>
                  </View>
                </View>
              );
            }
            return null;
          })}
        </View>
      ) : null}
    </>
  );
};

export default DropdownList;
