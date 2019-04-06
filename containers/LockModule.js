import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from "react-native";

class LockModule extends Component {
    constructor(props){
        super(props)
        this.state = {
            user_data:''
        }
    }
    async componentWillMount(){
        try{
            let user_data = await AsyncStorage.getItem('user_info');
            console.log("user data from lock module",user_data)
            this.setState({user_data})
        }catch(err){
            console.log("err from lock module", err);
        }
    }

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