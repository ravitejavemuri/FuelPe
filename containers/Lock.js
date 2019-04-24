import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    StatusBar,
    Image,
} from "react-native";
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';
import { Dropdown } from 'react-native-material-dropdown';

let city_name = "hyderabad";

let petrol_url = "https://still-tundra-35330.herokuapp.com/main/" + city_name + "/petrol/price.json";

class Lock extends Component {

    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this);
        this.fuelTypeRef = this.updateRef.bind(this, 'fuelType');
        this.state = {
            fuelType: 'Petrol',
            user_id: '',
            user_data: { email: '', givenName: '', familyName: '', name: '', photoUrl: '' },
            petrol_price: '...',
            diesel_price: '...',
            lpg_price: '...',
            lock_state: false,
            lock_expire_time: ''
        }
    }

    onChangeText(text) {
        this.setState({fuelType: text})
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    async componentWillMount() {
        try {
            let user_data = await AsyncStorage.getItem('user_info');
            let user_id = await AsyncStorage.getItem('user_id');
            this.setState({ user_id: user_id });
            this.setState({ user_data: { email: JSON.parse(user_data).email, givenName: JSON.parse(user_data).givenName, familyName: JSON.parse(user_data).familyName, name: JSON.parse(user_data).name, photoUrl: JSON.parse(user_data).photoUrl } });
            const response = await fetch(petrol_url);
            const petrol_price_json = await response.json();
            this.setState({ petrol_price: petrol_price_json.price });
            this.setState({diesel_price: '63.10'})
            this.setState({lpg_price: '55.24'})
            var uid = this.state.user_id.replace(/['"]+/g, '');
            firebase.database().ref('lock/' + uid).on("value", snapshot => {
                if (snapshot.val() !== null) {
                    var in_string = JSON.stringify(snapshot);
                    var locked = JSON.parse(in_string).locked;
                    var fuel_type = JSON.parse(in_string).fuel_type;
                    this.setState({ lock_state: locked });
                    this.setState({ fuelType: fuel_type });
                } else {
                    console.log('Nothing');
                }
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        } catch (err) {

            console.log("err from lock module", err);
        }
    }

    lockTrueFunction() {
        var uid = this.state.user_id.replace(/['"]+/g, '');
        if(this.state.fuelType == 'Diesel') {
            this.state.locked_price = this.state.diesel_price
        } else if(this.state.fuelType == 'Petrol') {
            this.state.locked_price = this.state.petrol_price
        } else if(this.state.fuelType == 'LPG') {
            this.state.locked_price = this.state.lpg_price
        }
        firebase.database().ref('lock/' + uid).update({
            locked: true,
            locked_on: Date.now(),
            lock_price: this.state.locked_price,
            fuel_type: this.state.fuelType
        });
    }

    lockFalseFunction() {
        var uid = this.state.user_id.replace(/['"]+/g, '');
        firebase.database().ref('lock/' + uid).update({
            locked: false,
            locked_on: null,
            lock_price: null,
            fuel_type: null
        });
    }

    render() {
        let { fuelType } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={true} />
                <View style={{ flex: 1, backgroundColor: colors.white }}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
                        <Text style={{ fontWeight: '700', fontSize: 30, marginTop: 40 }}>
                            Hi, {this.state.user_data.givenName}!
                        </Text>
                        <FontAwesome name="lock" size={30} style={{ marginTop: 40, display: this.state.lock_state ? 'flex' : 'none' }} />
                    </View>
                    <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: colors.grey }}>
                            Toady's Prices
                        </Text>
                        <View style={styles.fuelPriceSection}>
                            <View style={styles.individualPriceSection}>
                                <Text style={styles.fpsHeading}>Petrol</Text>
                                <View style={{ backgroundColor: colors.red01, height: 3, width: '25%' }} />
                                <Text style={styles.fpsPrices}><FontAwesome name="rupee" size={18} /> {this.state.petrol_price}</Text>
                            </View>
                            <View style={styles.individualPriceSection}>
                                <Text style={styles.fpsHeading}>Diesel</Text>
                                <View style={{ backgroundColor: colors.red01, height: 3, width: '25%' }} />
                                <Text style={styles.fpsPrices}><FontAwesome name="rupee" size={18} /> {this.state.diesel_price}</Text>
                            </View>
                            <View style={styles.individualPriceSection}>
                                <Text style={styles.fpsHeading}>LPG</Text>
                                <View style={{ backgroundColor: colors.red01, height: 3, width: '25%' }} />
                                <Text style={styles.fpsPrices}><FontAwesome name="rupee" size={18} /> {this.state.lpg_price}</Text>
                            </View>
                        </View>
                        <View style={styles.introDisplay}>
                            <Image style={styles.lockImage} source={require('../assets/main_screen.png')} />
                            <Text style={{ marginTop: 10, paddingHorizontal: 30, fontSize: 11, fontWeight: '500', textAlign: 'center' }}>
                                Lock and pay the best local fuel price for 7 days
                            </Text>
                        </View>
                        <View style={styles.lockSection}>
                            <Dropdown
                                ref={this.fuelTypeRef}
                                value={fuelType}
                                onChangeText={this.onChangeText}
                                label='Fuel Type'
                                data={fuelData}
                                style={{ width: '100%' }}
                                disabled={this.state.lock_state ? true : false}
                            />
                            <View style={{marginBottom: 10}}></View>
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
            </View>
        );
    }
}
export default Lock;

const fuelData = [
    { value: 'Petrol' },
    { value: 'Diesel' },
    { value: 'LPG' },
];

const styles = StyleSheet.create({
    fuelPriceSection: {
        paddingHorizontal: 10,
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    individualPriceSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fpsHeading: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 5
    },
    fpsPrices: {
        fontSize: 20,
        marginTop: 15
    },
    introDisplay: {
        paddingHorizontal: 10,
        marginTop: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    lockImage: {
        height: 100,
        resizeMode: 'contain'
    },
    lockSection: {
        paddingHorizontal: 20,
        marginTop: 60,
    }
});