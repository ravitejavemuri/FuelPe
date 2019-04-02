import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import  LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import firebase from 'firebase';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

const styles = StyleSheet.create({
  slideDefault:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'red'
  },
  Swip:{
    alignSelf: 'stretch'
  }
})
export default class App extends React.Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen:LoadingScreen,
  LoginScreen:LoginScreen,
  DashboardScreen:DashboardScreen
})

const AppNavigator = createAppContainer(AppSwitchNavigator);

