import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Alert
} from "react-native";
import { Constants, Location, Permissions,MapView } from 'expo';
import { IntentLauncherAndroid } from 'expo';



class MapsModule extends Component {
    constructor(props){
        super(props)
        this.state ={
            location:{
                latitude:17.3850,
                longitude:78.4867
            },
            errorMessage:null
        }

    }
    async componentDidMount(){
         this._checkLocationService()
        }
        
        _checkLocationService= async () =>{
            let enable_status = await Location.hasServicesEnabledAsync()
            console.log(enable_status);
            if(!enable_status){
                Alert.alert(
                    'Enable Location',
                    'Location is required !',
                    [
                        {text: 'Enable', onPress:  async () => {  await  IntentLauncherAndroid.startActivityAsync(
                            IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
                        );
                        this._getLocationAsync();
                    }
                },
            ],
            { cancelable: false }
        )
        
    } else {
        this._getLocationAsync();
   }
}

_getLocationAsync = async () => {
    
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status !== 'granted') {
        this.setState({
            errorMessage: 'Permission to access location was denied'
        });
        console.log(this.state.errorMessage)
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log("location is ", location)
    let location_state={
        latitude:location.coords.latitude,
        longitude:location.coords.longitude
    }
    console.log("location state", location_state,"lat and long from location ", location.latitude,location.longitude)
    this.setState({location:location_state})
}



render() {
    //console.log("state from render",this.state.location)
    return (
    <MapView
    ref={(ref)=> this.mapRef = ref}
    style={{ flex: 1 }}
        // initialRegion={{
        //   latitude: this.state.location.latitude,
        //   longitude: this.state.location.longitude,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}

      />
        );
    }
}
export default MapsModule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});