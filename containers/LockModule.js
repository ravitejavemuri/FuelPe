import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Platform,
} from "react-native";
import colors from '../styles/colors';
import Banner from '../components/banner/Banner';
import RoundedButton from '../components/buttons/RoundedButton';
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';
import moment from 'moment';
// import Geocoder from 'react-native-geocoding';

const SCROLLVIEW_REF = 'scrollview'

const { height, width } = Dimensions.get('window')

let city_name = "hyderabad";

let petrol_url = "https://still-tundra-35330.herokuapp.com/main/" + city_name + "/petrol/price.json";

class LockModule extends Component {

    state = { height: 0, autoPlay: true, user_id:'', user_data: { email:'', givenName:'', familyName:'', name:'', photoUrl:'' }, petrol_price: '...', lock_state:false, lock_expire_time:'' } //location:''

    constructor(props) {
        super(props)
        this._goToNextPage = this._goToNextPage.bind(this)
        this._onScroll = this._onScroll.bind(this)
        this._startAutoplay = this._startAutoplay.bind(this)
        this._stopAutoplay = this._stopAutoplay.bind(this)
        this._onScrollViewLayout = this._onScrollViewLayout.bind(this)

        this._currentIndex = 0;
        this._childernCount = 5;


    }

    componentDidMount() {
        if (this.state.autoPlay)
            this._startAutoplay()
        else
            this._stopAutoplay()
    }

    async componentWillMount() {
        try {
            let user_data = await AsyncStorage.getItem('user_info');

            let user_id = await AsyncStorage.getItem('user_id');
            // console.log("user data from lock module", JSON.parse(user_data));
            // console.log("user id from lock module", user_id);

            this.setState({user_id:user_id});
            this.setState({ user_data: {email:JSON.parse(user_data).email, givenName:JSON.parse(user_data).givenName, familyName:JSON.parse(user_data).familyName, name:JSON.parse(user_data).name, photoUrl:JSON.parse(user_data).photoUrl} });
            const response = await fetch(petrol_url);
            const petrol_price_json = await response.json();
            this.setState({ petrol_price: petrol_price_json.price });
            // console.log(petrol_price_json);

            var uid=this.state.user_id.replace(/['"]+/g, '');
            firebase.database().ref('lock/'+uid).on("value", snapshot => {
                // console.log(snapshot);
                if(snapshot.val() !== null) {
                    var in_string = JSON.stringify(snapshot);
                    var locked = JSON.parse(in_string).locked;
                    // console.log(locked);
                    this.setState({lock_state:locked});
                    
                } else {
                    console.log('Nothing');
                }
            }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        } catch (err) {

            console.log("err from lock module", err);
        }
    }

    lockTrueFunction() {
        var uid=this.state.user_id.replace(/['"]+/g, '');
        firebase.database().ref('lock/'+uid).update({
            locked: true,
            locked_on: Date.now(),
            lock_price: this.state.petrol_price
        });
    }

    lockFalseFunction() {
        var uid=this.state.user_id.replace(/['"]+/g, '');
        firebase.database().ref('lock/'+uid).update({
            locked: false,
            locked_on: null,
            lock_price: null
        });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, backgroundColor: colors.white, paddingTop: Platform.OS === 'ios' ? 40 : 60 }}>
                        <Text style={{ fontSize: Platform.OS === 'ios' ? 30 : 22, fontWeight: '700', paddingHorizontal: 40 }}>
                            Hi, {this.state.user_data.givenName}!
                        </Text>

                        <View style={{ height: 150, marginTop: 30 }}>
                            <ScrollView
                                style={{ flex: 1 }}
                                onLayout={this._onScrollViewLayout}
                                onScroll={this._onScroll}
                                ref={SCROLLVIEW_REF}
                                pagingEnabled={true}
                                scrollEventThrottle={8}
                            >
                                <Banner imageUri={require('../assets/banner1.jpg')} />
                                <Banner imageUri={require('../assets/banner1.jpg')} />
                                <Banner imageUri={require('../assets/banner1.jpg')} />
                                <Banner imageUri={require('../assets/banner1.jpg')} />
                                <Banner imageUri={require('../assets/banner1.jpg')} />
                            </ScrollView>
                        </View>
                        <View style={{ marginTop: 40, paddingHorizontal: 40 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: colors.grey }}>
                                Recently updated
                            </Text>
                            <View style={styles.priceContainer}>
                                <View style={{ flex: 3 }}>
                                    <Text style={{ fontSize: 20 }}>
                                        Current Price
                                    </Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text style={{ fontSize: 20 }}>
                                        <FontAwesome name="rupee" size={18} /> {this.state.petrol_price}
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 20 }}>
                                        <FontAwesome name={this.state.lock_state ? "lock" : "unlock"} size={25} color={this.state.lock_state ? colors.black : colors.red01} />
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={ [ {flex: 1, marginTop: 50, paddingHorizontal: 40, alignItems: 'center' }, {display: this.state.lock_state ? "flex" : "none"} ] }>
                            <Text style={{fontSize: 25}}>
                                Locked at {this.state.petrol_price}
                            </Text>
                        </View>
                        <View style={{ paddingHorizontal: 40, position: 'absolute', bottom: 30 }}>
                            <RoundedButton
                                text={this.state.lock_state ? "UNLOCK" : "LOCK"}
                                textColor={colors.white}
                                background={this.state.lock_state ? colors.black : colors.red01}
                                handleOnPress={this.state.lock_state ? this.lockFalseFunction.bind(this) : this.lockTrueFunction.bind(this)}
                                style={{ fontWeight: '700' }}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    _onScroll(event) {
        let { y } = event.nativeEvent.contentOffset, offset, position = Math.floor(y / this.state.height)
        if (y === this._preScrollY) return;
        this._preScrollY = y
        offset = y / this.state.height - position

        if (offset === 0) {
            this._currentIndex = position
            this._timerId = setInterval(this._goToNextPage, 2000)
        }
    }

    _onScrollViewLayout(event) {
        let { height } = event.nativeEvent.layout
        this.setState({ height: height })
    }

    _goToNextPage() {
        this._stopAutoplay();
        let nextIndex = (this._currentIndex + 1) % this._childernCount;
        this.refs[SCROLLVIEW_REF].scrollTo({ y: this.state.height * nextIndex })
    }

    _startAutoplay() {
        this._timerId = setInterval(this._goToNextPage, 2000)
    }

    _stopAutoplay() {
        if (this._timerId) {
            clearInterval(this._timerId)
            this._timerId = null
        }
    }
}
export default LockModule;

const styles = StyleSheet.create({
    priceContainer: {
        width: width - 40,
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});