
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Linking,
    Dimensions,
    LayoutAnimation,
    Modal
} from "react-native";
import { BarCodeScanner, Permissions } from 'expo';
import { Button } from "native-base";
import FullScreen from '../components/modals/FullScreen'
class QrModule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            lastScanned: null,
            show: false
        }
    }

    componentDidMount() {
        console.log("from qr", this.props.index)
        this._requestCameraPermission();
    }

    componentDidUpdate(prevProps, prevState) {
        // const { location } = this.props;
        if (this.props.id !== prevProps.id) {
            console.log("from qr", this.props.id)


        }
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission: status === 'granted'
        });
    }

    _handleBarCodeRead = result => {
        //console.log("scanned data", result.data)
        if (result.data && this.props.id === 0) {
            LayoutAnimation.spring();
            this.setState({ lastScanned: result.data, show: true })
        }
    }

    _closeModal = (status) => {
        this.setState({ show: status })
    }
    _renderScanned = () => {
        return (
            <View style={styles.scanned}>
                <FullScreen
                    visible={this.state.show}
                    close={this._closeModal}
                />
            </View>
        );
    }
    render() {
        return (
            <View style={styles.container} >
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
                                    height: Dimensions.get('window').height,
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
export default QrModule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scannedText: {
        color: '#fff',
        fontSize: 20
    },
    scanned: {
        position: 'absolute'
    },
    camBox: {
        
    }
});