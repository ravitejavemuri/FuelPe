import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class LockModule extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>LockModule</Text>
            </View>
        );
    }
}
export default LockModule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});