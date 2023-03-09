import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import RefrigeratorStack from './RefrigeratorStack';
import RefrigeratorPage from './src/components/views/RefrigeratorPage/RefrigeratorPage';
import LoginPage from './src/components/views/LoginPage/LoginPage';
import LandingStack from './LandingStack';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './src/_reducers'
import SplashScreen from 'react-native-splash-screen';
const Tab = createBottomTabNavigator();
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

// const RootStack = createNativeStackNavigator();
export default function App() {
  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide(); /** 추가 **/
      }, 2000); /** 스플래시 시간 조절 (2초) **/
    } catch(e) {
      console.warn('에러발생');
      console.warn(e);
    }
  });
  return (
    <Provider 
    store = {createStoreWithMiddleware(Reducer)}
    >
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="Refrigerator" component={RefrigeratorStack} options={{headerShown: false}}/>
          <Tab.Screen name="Home" component={LandingStack} options={{headerShown: false}}/>
          <Tab.Screen name="User" component={LoginPage} options={{headerShown: false}}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}




