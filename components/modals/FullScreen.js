import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableHighlight,
    Dimensions,
    TextInput,
} from "react-native";
import colors from '../../styles/colors';
import RoundedButton from '../buttons/RoundedButton';
import { FontAwesome } from '@expo/vector-icons';

class FullScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            paymentStatus: false
        }
    }

    payMechanism() {
        this.setState({paymentStatus: true});
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => { this.props.close(false) }}
            >
                {this.state.paymentStatus ?
                    <View style={styles.successContainer}>
                        <View style={styles.successModalBody}>
                            <FontAwesome name="check-circle" size={40} style={styles.successIcon} />
                            <Text style={styles.successText}>Payment Successful</Text>
                        </View>
                        <View style={styles.successModalFooter}>
                            <RoundedButton
                                text="CLOSE"
                                textColor={colors.white}
                                background={colors.red01}
                                handleOnPress={() => {
                                    this.props.close(false);
                                    this.setState({paymentStatus: false});
                                }}
                                style={{ fontWeight: '700' }}
                            />
                        </View>
                    </View>
                    :
                    <View style={styles.container}>
                        <View style={styles.modalBody}>
                            <Text style={styles.payText}>Pay {this.props.scannedText}</Text>
                            <TextInput
                                style={styles.amountInput}
                                placeholder='Amount'
                                keyboardType={'numeric'}
                            />
                        </View>
                        <View style={styles.modalFooter}>
                            <RoundedButton
                                text="PAY"
                                textColor={colors.white}
                                background={colors.red01}
                                handleOnPress={this.payMechanism.bind(this)}
                                style={{ fontWeight: '700' }}
                            />
                            <Text style={{marginTop: 0}}></Text>
                            <RoundedButton
                                text="CANCEL"
                                textColor={colors.red01}
                                background={colors.black}
                                handleOnPress={() => {
                                    this.props.close(false);
                                }}
                                style={{ fontWeight: '700' }}
                            />
                        </View>
                    </View>
                }
            </Modal>
        );
    }
}
export default FullScreen;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: Dimensions.get('window').height - 280,
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flex: 4,
        flexDirection: 'column',
        padding: 25,
        paddingHorizontal: 40
    },
    modalBody: {
        flex: 2
    },
    payText: {
        fontSize: 25,
        color: colors.red01,
        fontWeight: '700',
        marginTop: 20
    },
    amountInput: {
        marginTop: 45,
        borderBottomColor: colors.grey,
        borderBottomWidth: 2,
        fontSize: 18,
        padding: 5
    },
    modalFooter: {
        flex: 2
    },
    successContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: Dimensions.get('window').height - 280,
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        paddingHorizontal: 40
    },
    successModalBody: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successIcon: {
        color: colors.red01
    },
    successText: {
        fontSize: 25,
        color: colors.red01,
        fontWeight: '700',
        marginTop: 20
    },
    successModalFooter: {
        flex: 1
    },
});