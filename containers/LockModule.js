import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from "react-native";
import colors from '../styles/colors';
import Banner from '../components/banner/Banner';
import RoundedButton from '../components/buttons/RoundedButton';
import { FontAwesome } from '@expo/vector-icons';

const SCROLLVIEW_REF = 'scrollview'

const { height, width } = Dimensions.get('window')

class LockModule extends Component {

    state = { height: 0, autoPlay:true, user_data: '' }

    constructor(props) {
        super(props)
        this._goToNextPage = this._goToNextPage.bind(this)
        this._onScroll = this._onScroll.bind(this)
        this._startAutoplay = this._startAutoplay.bind(this)
        this._stopAutoplay = this._stopAutoplay.bind(this)
        this._onScrollViewLayout = this._onScrollViewLayout.bind(this)

        this._currentIndex = 0;
        this._childernCount = 5;

        // this.state = {               ADDED ON THE TOP
        //     user_data: ''
        // }
    }

    componentDidMount() {
        if (this.state.autoPlay)
            this._startAutoplay()
        else
            this._stopAutoplay()
    }

    async componentWillMount() {
        try{
            let user_data = await AsyncStorage.getItem('user_info');
            console.log("user data from lock module",user_data)
            this.setState({user_data})
        }catch(err){
            console.log("err from lock module", err);
        }
    }

    lockMechanism() {
        alert('Lock pressed');
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, backgroundColor: colors.white, paddingTop: 40 }}>
                        <Text style={{ fontSize: 30, fontWeight: '700', paddingHorizontal: 40 }}>
                            Hi, {this.state.user_data.replace(/['"]+/g, '')}!
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
                        <View style={{marginTop: 40, paddingHorizontal: 40}}>
                            <Text style={{fontSize:16, fontWeight:'500', color:colors.grey}}>
                                Recently updated
                            </Text>
                            <View style={ styles.priceContainer }>
                                <View style={{flex: 3}}>
                                    <Text style={{fontSize:17, marginBottom:15}}>
                                        Last updated Price
                                    </Text>
                                    <Text style={{fontSize:20}}>
                                        Current Price
                                    </Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize:17, marginBottom:15}}>
                                        <FontAwesome name="rupee" size={16} /> 81.5
                                    </Text>
                                    <Text style={{fontSize:20}}>
                                        <FontAwesome name="rupee" size={18} /> 80.3
                                    </Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{marginBottom:15}}>

                                    </Text>
                                    <Text style={{fontSize:30}}>
                                        <FontAwesome name="unlock" size={30} color={colors.red01}/>
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{paddingHorizontal: 40, position: 'absolute', bottom: 30}}>
                            <RoundedButton
                                text = "LOCK"
                                textColor = {colors.white}
                                background = {colors.red01}
                                handleOnPress={this.lockMechanism}
                                style={{fontWeight:'700'}}
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
        width: width-40,
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});