import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  Image,
  TouchableHighlight,
  Linking,
} from "react-native";
import firebase from 'firebase';
import '../utils/YellowWaringFix';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import { Ionicons } from '@expo/vector-icons';
import { OauthCreds } from '../config';


class LoginScreen extends Component {

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID && providerData[i].uid === googleUser.getBasicProfile().getId()) {
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);

    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        firebase.auth().signInAndRetrieveDataWithCredential(credential).then(async function (result) {
          console.log('user signed in');
          try {
            await AsyncStorage.setItem('user_id', JSON.stringify(result.user.uid));
          } catch(e) {
            console.log("async store err", e);
          }
          if(result.additionalUserInfo.isNewUser) {
            firebase.database().ref('/users/' + result.user.uid).set({
              email: result.user.email,
              profile_picture: result.additionalUserInfo.profile.picture,
              locale: result.additionalUserInfo.profile.locale,
              first_name: result.additionalUserInfo.profile.given_name,
              last_name: result.additionalUserInfo.profile.family_name,
              created_at: Date.now()
            }).then(function(snapshot) {
              // console.log('snapshot', snapshot);
            });
            // firebase.database().ref('/lock/' + result.user.uid).set({
            //   email: result.user.email,
            //   locked: false,
            //   locked_on: null,
            //   lock_expire: null
            // }).then(function(snapshot) {
            //   // console.log('snapshot', snapshot);
            // });
          } else {
            firebase.database().ref('/users/' + result.user.uid).update({
              last_logged_in: Date.now()
            });
          }
        }).catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
      } else {
        console.log('user already signed-in');
      }
    }.bind(this));
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        behavior: 'web',
        androidClientId: OauthCreds.AndroidAPI,
        iosClientId: OauthCreds.IosAPI,
        scopes: ['profile', 'email']
      });
      if (result.type === 'success') {
        this.onSignIn(result);
        try {
          await AsyncStorage.setItem('user_info', JSON.stringify(result.user));
        } catch(e) {
          console.log("async store err", e);
        }
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeWrapper}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>
            Welcome to FuelPe.
                </Text>
          <RoundedButton
            text="Continue with Google"
            textColor={colors.red01}
            background={colors.white}
            icon={<Ionicons name="logo-googleplus" size={20} style={styles.googleButtonIcon} />}
            handleOnPress={this.signInWithGoogleAsync}
          />
          <View style={styles.footContainer}>
            <Text style={styles.footText}>By clicking continue, I agree to FuelPe's </Text>
            <TouchableHighlight style={styles.linkOption} onPress={() => Linking.openURL('http://www.google.com')}>
              <Text style={styles.footText}>Terms of Service</Text>
            </TouchableHighlight>
            <Text style={styles.footText}>, </Text>
            <TouchableHighlight style={styles.linkOption}>
              <Text style={styles.footText} onPress={() => Linking.openURL('http://www.google.com')}>Payments Terms of Service</Text>
            </TouchableHighlight>
            <Text style={styles.footText}> and </Text>
            <TouchableHighlight style={styles.linkOption}>
              <Text style={styles.footText} onPress={() => Linking.openURL('http://www.google.com')}>Privacy Policy</Text>
            </TouchableHighlight>
            <Text style={styles.footText}>.</Text>
          </View>
        </View>
      </View>
    )
  }
}
export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.red01,
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.red01,
    justifyContent: 'center',
  },
  welcomeWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingLeft: 30,
    paddingRight: 20,
  },
  logo: {
    width: 50,
    height: 80,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  googleButtonIcon: {
    color: colors.red01,
    position: 'relative',
    left: 30,
    zIndex: 8,
  },
  footContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 40,
  },
  footText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
  },
  linkOption: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  },
})
