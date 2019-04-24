
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    LayoutAnimation,
} from "react-native";
import { BarCodeScanner, Permissions } from 'expo';
import FullScreen from '../components/modals/FullScreen';

class Pay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            lastScanned: null,
            show: false,
            id: 0
        }
    }

    componentDidMount() {
        console.log("from qr", this.state.id)
        this._requestCameraPermission();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.id !== prevProps.id) {
            console.log("from qr", this.state.id)
        }
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission: status === 'granted'
        });
    }

    _handleBarCodeRead = result => {
        if (result.data && this.state.id === 0) {
            LayoutAnimation.spring();
            this.setState({ lastScanned: result.data, show: true })
        }
    }

    _closeModal = (status) => {
        this.setState({ show: status })
    }
    _renderScanned = () => {
        return (
            <FullScreen
                visible={this.state.show}
                close={this._closeModal}
                scannedText={this.state.lastScanned}
            />
        );
    }
    render() {
        return (
            <View style={[styles.container, {backgroundColor: this.state.show ? 'rgba(0, 0, 0, 0.8)' : '#fff', } ]} >
                {this.state.hasCameraPermission === null
                    ?
                    <Text>Requesting Permission</Text>
                    : this.state.hasCameraPermission === false
                        ?
                        <View>
                            <Text style={{ color: '#fff' }}>
                                Camera permission is not granted
                             </Text>
                        </View>
                        :
                        <View style={styles.camBox }>
                            <BarCodeScanner
                                onBarCodeScanned={this._handleBarCodeRead.bind(this)}
                                style={{
                                    height: Dimensions.get('window').height - 250,
                                    width: Dimensions.get('window').width,
                                }}
                            />
                        </View>
                }
                {this._renderScanned()}
            </View>
        );
    }
}
export default Pay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});