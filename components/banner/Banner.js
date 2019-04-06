import React, { Component } from "react";
import { 
    View,
    StyleSheet,
    Image,
} from "react-native";
import colors from "../../styles/colors";

class Banner extends Component {
    
    render() {
        const containerHeight = 150;
        const childHeight = 150;
        const margin = (containerHeight - childHeight) / 2;
        return (
            <View style={{ flex: 1, height: childHeight, margin: margin }}>
                <Image source={this.props.imageUri} style={{ flex: 1, height: 50, resizeMode: 'contain', backgroundColor: colors.grey }} />
            </View>
        );
    }
}

export default Banner;

const styles = StyleSheet.create({
    container: {

    },
});