import {TextStyle, ViewStyle} from 'react-native';

const shema_btn_container: ViewStyle = {
  borderWidth: 2,
  borderRadius: 10,
  width: 150,
  height: 50,
  backgroundColor: 'black',
  position: 'absolute',
  marginLeft: 9,
  flexDirection: 'row',
  justifyContent: 'center',
};

// positions

const T12tTopTitle: TextStyle = {
  color: '#ffffff',
  marginTop: 25,
  fontSize: 16,
  position: 'absolute',
  marginLeft: 10,
};

const T12BorromTitle: TextStyle = {
  color: '#ffffff',
  marginTop: 50,
  marginLeft: 10,
  fontSize: 14,
  position: 'absolute',
};

const LeftBorder: ViewStyle = {
  borderColor: '#ffffff',
  borderWidth: 1,
  width: 115,
  height: 1,
  marginTop: 49,
  marginLeft: 0,
};

const CenterBorder: ViewStyle = {
  borderColor: '#ffffff',
  borderWidth: 2,
  borderRadius: 10,
  width: 170,
  height: 100,
};

const RightBorderCenterContainer: ViewStyle = {
  borderColor: '#ffffff',
  borderWidth: 1,
  width: 90,
  height: 1,
  marginTop: 49,
};

const RightBorderCenter: ViewStyle = {
  borderColor: '#ffffff',
  borderWidth: 1,
  width: 50,
  height: 1,
  marginTop: -40,
};

const ShemaBtnAnimatedBlockContainer: ViewStyle = {
  position: 'absolute',
  borderRadius: 30,
};

const ShemaBtnAnimatedBlock: ViewStyle = {
  width: 147, //width: 117,
  height: 47, //height: 47,
};

const T5UstContainer: ViewStyle = {
  position: 'absolute',
  width: 230,
};

const T5UstTitle: TextStyle = {
  color: 'white',
  margin: 35,
  marginLeft: 25,
  fontSize: 18,
};

export const ShemesStyle = {
  shema_btn_container,
  T12tTopTitle,
  T12BorromTitle,
  LeftBorder,
  CenterBorder,
  ShemaBtnAnimatedBlockContainer,
  ShemaBtnAnimatedBlock,
  T5UstContainer,
  T5UstTitle,
  RightBorderCenterContainer,
  RightBorderCenter,
};
