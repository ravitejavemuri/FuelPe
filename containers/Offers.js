import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native";
import { Container, Content, Header, Left, Right, Card, CardItem } from 'native-base';
import colors from '../styles/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Banner from '../components/banner/Banner';
import RecommendedCardItem from "../components/RecommendedCard/RecommendedCardItem";

const SCROLLVIEW_REF = 'scrollview'

class Offers extends Component {

    state = { height: 0, autoPlay: true }
    
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

    render() {
        return (
            <Container>
                <Header style={{backgroundColor: colors.red01, height: 90, borderBottomColor: colors.grey}}>
                    <Left>
                        <Text style={{color: colors.white, marginLeft: 15, fontSize: 20, fontWeight: '700'}}>My Offers</Text>
                    </Left>
                    <Right style={{marginRight: 15}}>
                        <MaterialCommunityIcons name="cart" size={28} color={colors.white} />
                    </Right>
                </Header>
                <Content>
                    <View style={{ height: 200 }}>
                        <ScrollView
                            style={{ flex: 1 }}
                            onLayout={this._onScrollViewLayout}
                            onScroll={this._onScroll}
                            ref={SCROLLVIEW_REF}
                            pagingEnabled={true}
                            scrollEventThrottle={8}
                            showsVerticalScrollIndicator={false}
                        >
                            <Banner imageUri={require('../assets/banner1.jpg')} />
                            <Banner imageUri={require('../assets/banner1.jpg')} />
                            <Banner imageUri={require('../assets/banner1.jpg')} />
                            <Banner imageUri={require('../assets/banner1.jpg')} />
                            <Banner imageUri={require('../assets/banner1.jpg')} />
                        </ScrollView>
                    </View>
                    <Card>
                        <CardItem>
                            <Text style={{fontSize: 18, fontWeight: '700', paddingBottom: 20}}>Recommendations for you</Text>
                        </CardItem>
                        <RecommendedCardItem
                            itemName="Monster Energy Drink"
                            itemPrice="Rs.120"
                            savings="23"
                            imageUri={require("../assets/recommended_1.jpg")}
                            rating={3.5}
                        />
                        <RecommendedCardItem
                            itemName="Lays Chips"
                            itemPrice="Rs.45"
                            savings="10"
                            imageUri={require("../assets/recommended_2.jpg")}
                            rating={4.5}
                        />
                        <RecommendedCardItem
                            itemName="Pringles Cheese & Onion"
                            itemPrice="Rs.85"
                            savings="14"
                            imageUri={require("../assets/recommended_3.jpg")}
                            rating={5}
                        />
                        <RecommendedCardItem
                            itemName="KitKat"
                            itemPrice="Rs.30"
                            savings="2"
                            imageUri={require("../assets/recommended_4.jpg")}
                            rating={4}
                        />
                        <RecommendedCardItem
                            itemName="Mars Bar"
                            itemPrice="Rs.55"
                            savings="3"
                            imageUri={require("../assets/recommended_5.jpg")}
                            rating={5}
                        />
                        <RecommendedCardItem
                            itemName="Duracell AA Batteries Pack of 4"
                            itemPrice="Rs.100"
                            savings="10"
                            imageUri={require("../assets/recommended_6.jpg")}
                            rating={5}
                        />
                    </Card>
                </Content>
            </Container>
        );
    }

    _onScroll(event) {
        let { y } = event.nativeEvent.contentOffset, offset, position = Math.floor(y / this.state.height)
        if (y === this._preScrollY) return;
        this._preScrollY = y
        offset = y / this.state.height - position

        if (offset === 0) {
            this._currentIndex = position
            this._timerId = setInterval(this._goToNextPage, 6000)
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
        this._timerId = setInterval(this._goToNextPage, 6000)
    }

    _stopAutoplay() {
        if (this._timerId) {
            clearInterval(this._timerId)
            this._timerId = null
        }
    }
}
export default Offers;

const styles = StyleSheet.create({

});