
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import MapsModule from '../containers/MapsModule';
import LockModule from '../containers/LockModule';
import QrModule from '../containers/QrModule';
import colors from '../styles/colors';

let index;
export default class DashboardScreen extends Component {
    render() {
    return (
    <Swiper 
        //style={styles.wrapper}
        // showsButtons
        loop={false}
        onIndexChanged={(index)=>{this.setState({index})}}
        showsPagination={false}
        index={1}
         nextButton={<Text/>}
    >
        <View style={styles.slide1}>
          <QrModule/>
        </View>
        <View style={styles.slide2}>
            <LockModule/>
        </View>
        <MapsModule />
    </Swiper>
        );
    }
}

const styles = StyleSheet.create({
wrapper: {
},
slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red01,
},
slide2: {
    flex: 1,
    backgroundColor: colors.white,
},
slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red01,
},
text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
}
});
    
