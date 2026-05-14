import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import {IndexStyle} from '../../components/pages/page-styles/index.style';


const InternetConnectionComponent = () => {
  const isConnected = useIsConnected();
  return (
    <View style={styles.container}>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    margin: 10,
  },
  errorText: {
    color: 'white',
    fontSize: 16,
  },
});

export default InternetConnectionComponent;
