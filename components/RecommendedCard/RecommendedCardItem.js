import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import colors from '../../styles/colors';
import { CardItem, Right } from "native-base";
import { Rating } from 'react-native-ratings';

class RecommendedCardItem extends Component{
    render(){
        return(
            <CardItem>
                <View>
                    <Image
                        style={{height: 90, width: 90}}
                        source={this.props.imageUri}
                    />
                </View>
                <Right style={{ flex: 1, alignItems: 'flex-start', height: 90, paddingHorizontal: 20 }}>
                    <Text style={{fontWeight: '700'}}>{this.props.itemName}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: colors.red01 }}>{this.props.itemPrice}</Text>
                    <Text><Text style={{ color: colors.grey, fontWeight: '300', fontSize: 12 }}>You Save </Text>Rs.{this.props.savings}</Text>
                    <Rating
                        style={{ paddingVertical: 10 }}
                        imageSize={15}
                        fractions={1}
                        readonly={true}
                        minValue={0}
                        startingValue={this.props.rating}
                    />
                </Right>
            </CardItem>
        )
    }
}

export default RecommendedCardItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});