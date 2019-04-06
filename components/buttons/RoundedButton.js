import React, { Component } from 'react';
import propTypes from 'prop-types';
import colors from '../../styles/colors';
import { 
    StyleSheet, 
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

export default class RoundedButton extends Component {
    render() {
        const { text, textColor, background, icon, handleOnPress } = this.props;
        const backgroundColor = background || 'transparent';
        const color = textColor || colors.black;
        return (
            <TouchableHighlight 
                style = {[ {backgroundColor}, styles.wrapper ]}
                onPress = { handleOnPress }
            >
                <View style={styles.buttonTextWrapper}>
                    {icon}
                    <Text style = {[{color}, styles.buttonText ]}>{text}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

RoundedButton.propTypes = {
    text: propTypes.string.isRequired,
    textColor: propTypes.string,
    background: propTypes.string,
    icon: propTypes.object,
    handleOnPress: propTypes.func.isRequired,
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        padding: 15,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: colors.white,
    },
    buttonTextWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        width: '100%',
        textAlign: 'center',
    },
});