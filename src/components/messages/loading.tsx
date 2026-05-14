/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {ReactElement} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

export const LoadingMessage = (): ReactElement => {
  return (
    <View
      style={
        {
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            backgroundColor: '#242424',
            borderRadius: 10,
            borderColor: '#333334',
            borderWidth: 1,
            marginBottom: 15,
            height: 70,
        }
      }>
      <TouchableOpacity>
        <Image
          style={{width: 30, height: 30, margin: 10, marginTop: 20}}
          source={require('../../../public/images/loading.gif')}
        />
      </TouchableOpacity>
      <Text style={{color: '#ffffff', fontSize: 16, marginTop: 23}}>Завантаження</Text>
    </View>
  );
};
