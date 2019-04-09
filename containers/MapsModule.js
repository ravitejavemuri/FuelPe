import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    FlatList,
    ActivityIndicator,
    TouchableHighlight
} from "react-native";
import { Constants, Location, Permissions, MapView } from 'expo';
import { IntentLauncherAndroid } from 'expo';
import { data } from '../utils/dummy';
import axios from 'axios';
import { mapsApi } from '../config';
import ListItem from '../components/lists/ListItem'
import getDirections from 'react-native-google-maps-directions'


class MapsModule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            location: {
                latitude: 18.3850,
                longitude: 78.4867
            },
            errorMessage: null,
            markers: [],
            metadata: '',
            current_dest: ''
        }
        this._showRoute = this._showRoute.bind(this)
    }
    _keyExtractor = (item, index) => item.id;

    componentDidUpdate(prevProps, prevState) {
        const { location } = this.props;
        if (this.props.location !== prevProps.location) {
            console.log("from maps", location)
            this.setState({ location })
            this._fetchData(location)

        }
    }
    _fetchData = async (location_state) => {
        // code for real time request
        try {
            if (location_state) {
                console.log(location_state.latitude, mapsApi)
                // let orig_data = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location_state.latitude}, ${location_state.longitude}&radius=5000&type=gas_station&key=${mapsApi}`)

                let cords = data.results.map((point) => { // add orig_data. before data for production
                    return point.geometry.location
                })
                let metadata = data.results.map((meta) => {
                    let meta_data = {
                        name: meta.name,
                        area: meta.vicinity,
                        rating: meta.rating,
                        id: meta.id
                    }
                    return meta_data
                })
                //console.log(metadata)
                this.setState({ markers: cords, metadata })
            } else {
                console.log("inside else of the fetch data")
                // Alert.alert(
                //     'Enable Location',
                //     'Location is required !',
                //     [
                //         {
                //             text: 'Enable', onPress: async () => {
                //                 await IntentLauncherAndroid.startActivityAsync(
                //                     IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
                //                 );
                //             }
                //         },
                //     ],
                //     { cancelable: false }
                // )
            }

        } catch (err) {
            console.log(err);
        }

    }

    _showRoute = (index) => {
        console.log("after press", index)
        const data = {
            source: {
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude
            },
            destination: {
                latitude: this.state.markers[index].lat,
                longitude: this.state.markers[index].lng
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"
                },
                {
                    key: "dir_action",
                    value: "navigate"
                }
            ]
        }
        console.log('data is ', data)
        getDirections(data)
    }


    render() {
        return (
            <React.Fragment >
                <MapView
                    style={styles.mapContainer}
                    region={{
                        latitude: this.state.location.latitude,
                        longitude: this.state.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}

                >
                    {this.props.location ?
                        <MapView.Marker
                            //key={index}
                            coordinate={this.state.location}
                            title={"me"}
                            pinColor={"teal"}
                        //description={metadata}
                        /> : false
                    }

                    {
                        this.state.markers.map((marker, index) => {
                            //console.log("marker",marker)
                            const coords = {
                                latitude: marker.lat,
                                longitude: marker.lng,
                            };
                            return (
                                <MapView.Marker
                                    key={index}
                                    coordinate={coords}
                                    title={"petrol"}
                                />
                            )
                        })}

                </MapView>
                <View style={styles.listContainer}>
                    {this.state.metadata ?
                        <FlatList
                            // pagingEnabled ={true}
                            data={this.state.metadata}
                            //extraData={this.state}
                            keyExtractor={this._keyExtractor}

                            renderItem={({ item, index }) => (
                                <ListItem
                                    name={item.name}
                                    area={item.area}
                                    rating={item.rating}
                                    key={item.id}
                                    id={item.id}
                                    index={index}
                                    route={this._showRoute}
                                />
                            )}


                        />
                        :
                        <View style={styles.Indicator}>
                            <Text style={{ color: 'white' }}>Waiting for location</Text>
                            <ActivityIndicator size="large" color="white" />
                            {/* <Button   onPress={ () => {this.props.refresh()}}/> */}
                        </View>

                    }
                </View>
            </React.Fragment>
        );
    }
}
export default MapsModule;

const styles = StyleSheet.create({
    mapContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        //marginBottom:150
    },
    listContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'grey',
        //bottom:0,
        //padding:3
    },
    Indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }

});




    //     _checkLocationService= async () =>{
    //         let enable_status = await Location.hasServicesEnabledAsync()
    //        // console.log(enable_status);
    //         if(!enable_status){
    //             Alert.alert(
    //                 'Enable Location',
    //                 'Location is required !',
    //                 [
    //                     {text: 'Enable', onPress:  async () => {  await  IntentLauncherAndroid.startActivityAsync(
    //                         IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
    //                     );
    //                     this._getLocationAsync();
    //                 }
    //             },
    //         ],
    //         { cancelable: false }
    //     )

    // } else {
    //     this._getLocationAsync();
    // }
    // }

    // _getLocationAsync = async () => {
    //     try{
    //         let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //         if(status !== 'granted') {
    //             this.setState({
    //                 errorMessage: 'Permission to access location was denied'
    //             });
    //             //console.log(this.state.errorMessage)
    //         }
    //         let location = await Location.getCurrentPositionAsync({});
    //         //console.log("location is ", location)
    //         let location_state={
    //             latitude:location.coords.latitude,
    //             longitude:location.coords.longitude
    //         }
    //        // console.log("location state", location_state,"lat and long from location ", location.latitude,location.longitude)

    //         this.props.getLocation(location);
    //         this.setState({location:location_state})
    //         this._fetchData(location_state);

    //     }catch(err){
    //         console.log(err)
    //     }
    // }