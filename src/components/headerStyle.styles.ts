import { TextStyle, ViewStyle, ImageStyle } from 'react-native';

const headerContainer: ViewStyle = {
  width: '100%',
  height: 60,
  backgroundColor: '#242424',
  borderRadius: 10,
  marginTop: 10,
};

const rowContainer: ImageStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const avatar: ViewStyle = {
  width: 75,
  height: 75,
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  marginRight: 15,
  marginTop: -7,
};

const avatarImage: ImageStyle = {
  width: 45,
  height: 45,
  position: 'relative',
  zIndex: 10,
  margin: 8,
  borderRadius: 50,
};

const menuIco: ImageStyle = {
  width: 25,
  height: 20,
  position: 'relative',
  zIndex: 10,
  margin: 20,
  marginLeft: -5,
};

const innerText2: TextStyle = {
  color: '#ffffff',
  fontSize: 25,
};

const BtnText: TextStyle = {
  marginTop: 20,
  color: '#ffffff',
  fontSize: 25,
};

const logoContainer: ImageStyle = {
  width: 105,
  height: 75,
  marginLeft: 50,
  margin: 12,
  position: 'absolute',
};

const logo: ImageStyle = {
  width: 66,
  height: 58,
};

const tinyLogo: ImageStyle = {
  width: 50,
  height: 50,
};

//Side bar

const SideMenuContainer: TextStyle = {
  width: '70%',
  backgroundColor: '#242424',
  height: '100%',
  margin: -18,
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
};

const ContentContainer: TextStyle = {
  width: '100%',
  backgroundColor: '#191919',
  height: 70,
  borderTopRightRadius: 10,
};

const LogoContainer: TextStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const LogoImg: ImageStyle = {
  width: 30,
  height: 50,
  margin: 10,
};

const LogoText: TextStyle = {
  fontSize: 30,
  color: '#ffffff',
  marginLeft: 5,
  margin: 13,
  fontWeight: 'bold',
};

const BtnContainer1: TextStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 10,
};

const BtnIco1: ImageStyle = {
  width: 25,
  height: 25,
  margin: 10,
};

const BtnText1: TextStyle = {
  fontSize: 20,
  color: '#ffffff',
  marginLeft: 5,
  margin: 10,
};

const BtnContainer2: TextStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 5,
};

const BtnIco2: ImageStyle = {
  width: 25,
  height: 25,
  margin: 10,
};

const BtnText2: TextStyle = {
  fontSize: 20,
  color: '#ffffff',
  marginLeft: 0,
  margin: 10,
};

//BurgerSideMenu

const defaultBorder: TextStyle = {
  width: '100%',
  backgroundColor: '#333334',
  height: 3,
  marginTop: 15,
};

const flex: TextStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const footerText: TextStyle = {
  color: '#a1a1a1',
  marginTop: 10,
  width: '80%',
};

const burgWrap: TextStyle = {
  width: 75,
  height: 75,
  alignItems: 'center',
};

const addItemWrap: ImageStyle = {
  width: 35,
  height: 35,
  marginLeft: 10,
};

const foterIco: ImageStyle = {
  width: 25,
  height: 25,
  margin: 10,
};

const attItemContainer: ViewStyle = {
  backgroundColor: '#242424',
  width: 70,
  height: 280,
  marginTop: -280,
  marginLeft: '80%',
  borderRadius: 15,
};

const btnAddItem: ImageStyle = {
  width: 50,
  height: 50,
  margin: 10,
};

export const styles = {
  headerContainer,
  avatar,
  avatarImage,
  rowContainer,
  menuIco,
  innerText2,
  BtnText,
  logoContainer,
  logo,
  tinyLogo,
  SideMenuContainer,
  ContentContainer,
  LogoContainer,
  LogoImg,
  LogoText,
  BtnContainer1,
  BtnIco1,
  BtnText1,
  BtnContainer2,
  BtnIco2,
  BtnText2,
  defaultBorder,
  flex,
  footerText,
  burgWrap,
  addItemWrap,
  foterIco,
  attItemContainer,
  btnAddItem,
};
