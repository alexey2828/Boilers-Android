/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import SwitchToggle from 'react-native-switch-toggle';

type DataPicker = {
  isSelected: boolean;
  setIsSelected: (isSelected: boolean) => void;
};

export const SwitchToggleComponent: React.FC<DataPicker> = ({
  isSelected,
  setIsSelected,
}) => {
  return (
    <>
      <SwitchToggle
        switchOn={isSelected}
        onPress={() => {
          setIsSelected(!isSelected);
        }}
        circleColorOff="#C4C4C4"
        circleColorOn="#67E761"
        backgroundColorOn="#6D6D6D"
        backgroundColorOff="#4F4F4F"
        containerStyle={{
          marginTop: 25,
          width: 60,
          height: 30,
          borderRadius: 25,
          padding: 5,
        }}
        circleStyle={{
          width: 20,
          height: 20,
          borderRadius: 20,
        }}
      />
    </>
  );
};
