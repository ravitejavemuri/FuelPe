
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Alert,
    Linking,
    Dimensions,
    LayoutAnimation,
} from "react-native";
import { BarCodeScanner, Permissions } from 'expo';
import { Button } from "native-base";

class QrModule extends Component {
    constructor(props){
        super(props)
        this.state={
            hasCameraPermission:null,
            lastScanned:null
        }
    }

    componentDidMount(){
        console.log("from qr",this.props.index)
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission: status === 'granted'
        });
    }

    _handleBarCodeRead = result =>{        
        //console.log("scanned data", result.data)
        if(result.data !== this.state.lastScanned){
            LayoutAnimation.spring();
            this.setState({lastScanned: result.data})
        }
    }
    _renderScanned = () => {
        return(
            <View style={styles.bottomBar}>
                <Text  numberOfLines={1} style={styles.scannedText} onPress={()=>this.setState({lastScanned:''})}>
                     {this.state.lastScanned}
                </Text>
            </View>
        );
    }
    render() {
        return (
            <View style={styles.container} >
                { this.state.hasCameraPermission === null 
                ?
                <Text>Requesting Permission</Text>
                : this.state.hasCameraPermission === false
                ? 
                <View>
                <Text style={{ color: '#fff' }}>
                    Camera permission is not granted
                </Text>
                <Button/>
                </View>
                :
                <BarCodeScanner
                onBarCodeScanned = {this._handleBarCodeRead.bind(this)}
                    style={{
                        height: Dimensions.get('window').height,
                        width: Dimensions.get('window').width,
                      }}
                />
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
    scannedText:{
        color:'#fff',
        fontSize:20
    },
      bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
});