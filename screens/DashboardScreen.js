
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import MapsModule from '../containers/MapsModule';
import LockModule from '../containers/LockModule';
import QrModule from '../containers/QrModule';
import {  Location, Permissions } from 'expo';
import colors from '../styles/colors';

let index;
export default class DashboardScreen extends Component {


    constructor(props){
        super(props)
        this.state = {
            location_state:'',
            errorMessage:null,
        }
    }
     componentWillMount() {
        this._getLocationAsync()

    }
   
    _getLocationAsync = async () => {
        console.log('inside get location')
        try{
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            console.log("status", status)
            if(status !== 'granted') {
                console.log("not granted",this.state.errorMessage)
                this.setState({
                    errorMessage: 'Permission to access location was denied'
                });
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log("location is ", location)
            let location_state={
                latitude:location.coords.latitude,
                longitude:location.coords.longitude
            }
            console.log("location state", location_state,"lat and long from location ")
        
            //this.props.getLocation(location);
            this.setState({location_state:location_state})
            //this._fetchData(location_state);
    
        }catch(err){
            console.log(err)
        }
    }


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
          <QrModule id={this.state.index} />
        </View>
        <View style={styles.slide2}>
            <LockModule location_lock = {this.state.location_state}/>
        </View>
        <MapsModule 
            location={this.state.location_state}
            refresh = {this._getLocationAsync}
         />
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
    //backgroundColor: colors.red01,
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
    
