import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Modal
} from "react-native";


class FullScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Modal 
                    animationType="slide"
                    visible={this.props.visible}
                    transparent={false}
                    onRequestClose={()=>{this.props.close(false)}}
                >
                    <View style={styles.modalHead}>
                        <Text>Head</Text>
                    </View>
                    <View style={styles.modalBody}>
                        <Text>Body</Text>
                    </View>
                    <View style ={styles.modalFoot}>
                        <Text>Foot</Text>
                    </View>
                </Modal>
            </View>
        );
    }
}
export default FullScreen;

const styles = StyleSheet.create({
    container: {
        flex: 3,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalHead :{
        flex:1,
        backgroundColor:"red"
    },
    modalBody:{
        flex:1,
        backgroundColor:"green"

    },
    modalFoot:{
        flex:1,
        backgroundColor:"yellow"
    }
});