import {TextStyle, ViewStyle} from 'react-native';

const TopTitle: TextStyle = {
  fontSize: 20,
  color: 'white',
  marginTop: 20,
};

const BottomTitle: TextStyle = {
  color: '#a1a1a1',
  fontSize: 16,
};

const ListTitle: TextStyle = {
  color: 'white',
  margin: 10,
  fontSize: 16,
};

const Row: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
};

const RowFlexEnd: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-end',
};

const RowFlexCenter: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
};

const RowFlexStart: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
};

const RowFlexSpaceBetween: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const PageContainer: ViewStyle = {
  margin: 0,
  backgroundColor: '#222222',
  borderRadius: 10,
  height: '100%',
};

const CircleBtnContainer: ViewStyle = {
  width: '100%',
  height: 42,
  borderColor: '#464646',
  borderWidth: 2,
  borderRadius: 50,
  marginTop: 5,
};

const CircleBtnTitle: TextStyle = {
  color: '#a1a1a1',
  margin: 10,
  marginTop: -3,
  fontSize: 20,
};

export const IndexStyle = {
  TopTitle,
  BottomTitle,
  Row,
  PageContainer,
  RowFlexEnd,
  RowFlexCenter,
  ListTitle,
  RowFlexStart,
  RowFlexSpaceBetween,
  CircleBtnContainer,
  CircleBtnTitle,
};
