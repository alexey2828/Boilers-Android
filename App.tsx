import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import Login from './src/components/pages/login';
import Home from './home';
import {GraphicsScreen} from './graphics-screen';
import {createStackNavigator} from '@react-navigation/stack';
import { PikLoad } from './src/components/pages/pik-load';
import { TenActivation } from './src/components/pages/ten-activation';
import ChooseBoiler from './src/components/pages/chooseBoiler';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName={'ChooseBoiler'}>
        <Stack.Screen
          options={() => ({
            tabBarStyle: {display: 'none'},
            tabBarVisible: false,
            headerShown: false,
            tabBarButton: () => null,
          })}
          name="Авторизація"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Опалення"
          component={Home}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Котли"
          component={Home}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ПорядокТенів"
          component={TenActivation}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ПікНавантаження"
          component={PikLoad}
        />
        <Stack.Screen
          options={() => ({
            tabBarVisible: false,
            headerShown: false,
            tabBarButton: () => null,
          })}
          name="GraphicsScreen"
          component={GraphicsScreen}
        />
        <Stack.Screen
          options={() => ({
            tabBarVisible: false,
            headerShown: false,
            tabBarButton: () => null,
          })}
          name="ChooseBoiler"
          component={ChooseBoiler}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
