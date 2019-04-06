
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { MapView } from 'expo';
import MapsModule from '../containers/MapsModule';
import LockModule from '../containers/LockModule';
import QrModule from '../containers/QrModule';
import { MaterialIcons } from '@expo/vector-icons';

let index;
export default class DashboardScreen extends Component {
   
   constructor(props){
       super(props)
      
   }

    render() {
    return (
    <Swiper 
        //style={styles.wrapper}
        //showsButtons
        loop={false}
        showsPagination={false}
        onIndexChanged={(index)=>{
            this.index = index;
            console.log('index', this.index)
        }}
        index={1}
         //nextButton={<Text/>}
    >
        {/* <View style={styles.slide1}>
           <QrModule index = {this.index}/>
        </View> */}
        {/* <View style={styles.slide2}>
            <LockModule/>
        </View> */}
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
    backgroundColor: '#9DD6EB'
},
slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
},
slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
},
text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
}
});


