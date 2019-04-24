
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import colors from '../styles/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import Pay from '../containers/Pay';
import Lock from '../containers/Lock';
import FuelStation from '../containers/FuelStation';
import Settings from '../containers/Settings';
import Offers from '../containers/Offers';

export default createMaterialBottomTabNavigator({
    Pay: {
        screen: Pay,
        navigationOptions: {
            tabBarLabel: <Text style={{fontWeight: '700'}}>Pay</Text>,
            tabBarColor: colors.white,
            activeColor: colors.red01,
            inactiveColor: colors.grey,
            tabBarIcon:({tintColor}) => (
                <MaterialCommunityIcons name="qrcode-scan" color={tintColor} size={24} />
            )
        },
    },
    Offers: {
        screen: Offers,
        navigationOptions: {
            tabBarLabel: <Text style={{fontWeight: '700'}}>My Offers</Text>,
            tabBarColor: colors.white,
            activeColor: colors.red01,
            inactiveColor: colors.grey,
            tabBarIcon:({tintColor}) => (
                <MaterialCommunityIcons name="ticket-percent" color={tintColor} size={24} />
            )
        },
    },
    Lock: {
        screen: Lock,
        navigationOptions: {
            tabBarLabel: <Text style={{fontWeight: '700'}}>Lock</Text>,
            tabBarColor: colors.red01,
            activeColor: colors.white,
            inactiveColor: '#f2f2f2',
            tabBarIcon:({tintColor}) => (
                <Image source={require("../assets/tabbar.png")} style={{height: 24, width: 24, tintColor: tintColor}} />
            )
        },
    },
    FuelStations: {
        screen: FuelStation,
        navigationOptions: {
            tabBarLabel: <Text style={{fontWeight: '700'}}>Nearby</Text>,
            tabBarColor: colors.white,
            activeColor: colors.red01,
            inactiveColor: colors.grey,
            tabBarIcon:({tintColor}) => (
                <MaterialCommunityIcons name="gas-station" color={tintColor} size={24} />
            )
        },
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            tabBarLabel: <Text style={{fontWeight: '700'}}>Settings</Text>,
            tabBarColor: colors.white,
            activeColor: colors.red01,
            inactiveColor: colors.grey,
            tabBarIcon:({tintColor}) => (
                <MaterialCommunityIcons name="account-settings" color={tintColor} size={24} />
            )
        },
    }    
}, {
    initialRouteName: 'Lock',
    barStyle: {
        borderTopWidth: 0,
        shadowOffset: { width: 3, height: 3  },
        shadowColor: colors.black,
        shadowOpacity: 0.5,
        elevation: 5
    },
});

const styles = StyleSheet.create({
    wrapper: {
    },
});

