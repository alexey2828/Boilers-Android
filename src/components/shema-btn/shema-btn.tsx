/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {colors} from '../../const/colors';
import {IndexStyle} from '../pages/page-styles/index.style';
import {ShemesStyle} from '../pages/page-styles/shema.style';
import AnimatedColorView from 'react-native-animated-colors';
import {states} from '../../const/states';
import {chooseState} from '../../infrastructure/choose-satate/choose-state';
import {createBinaryString} from '../../infrastructure/create-binary-string/create-sinary-string';

type ShemaButton = {
  data: any;
  title: string;
  margin: number;
};

export const ShemaButton: React.FC<ShemaButton> = ({data, title, margin}) => {
  return (
    <View
      style={[
        ShemesStyle.shema_btn_container,
        {
          backgroundColor: 'transparent',
          borderColor: chooseState(createBinaryString(data), states.sOn)
            ? colors.lightGreen
            : '#ffffff',
          marginTop: margin,
        },
      ]}>
      <Text
        style={[
          IndexStyle.TopTitle,
          {marginTop: 5, zIndex: 2, position: 'relative', fontSize: 13},
        ]}>
        {title}
      </Text>
      <View style={ShemesStyle.ShemaBtnAnimatedBlockContainer}>
        <View
          style={[
            ShemesStyle.ShemaBtnAnimatedBlock,
            {
              backgroundColor: chooseState(createBinaryString(data), states.sOn)
                ? colors.gray
                : '#121212',
              borderRadius: 10,
              opacity: 0.9,
            },
          ]}
        />
      </View>
    </View>
  );
};
