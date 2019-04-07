
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
import { Google } from 'expo';
import firebase from 'firebase';
import  '../utils/YellowWaringFix';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import { Ionicons } from '@expo/vector-icons';


class LoginScreen extends Component {
    constructor() {
        super();
        this.state={
          login:false
        }
     }

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (
              providerData[i].providerId ===
                firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.getBasicProfile().getId()
            ) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      };

    onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(
          function(firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.isUserEqual(googleUser, firebaseUser)) {
              // Build Firebase credential with the Google ID token.
              var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
              );
              // Sign in with credential from the Google user.
              firebase
                .auth()
                .signInAndRetrieveDataWithCredential(credential)
                .then(async function(result) {
                  console.log('user signed in ', result.additionalUserInfo.profile);
                  try{
                    await AsyncStorage.setItem('user_info',JSON.stringify(result.additionalUserInfo.profile.given_name))
                  }catch(err){
                    console.log("async store err", err);
                  }
                })
                .then(function(result) {
                  console.log('user signed in ');
                  if (result.additionalUserInfo.isNewUser) {
                    firebase
                      .database()
                      .ref('/users/' + result.user.uid)
                      .set({
                        gmail: result.user.email,
                        profile_picture: result.additionalUserInfo.profile.picture,
                        first_name: result.additionalUserInfo.profile.given_name,
                        last_name: result.additionalUserInfo.profile.family_name,
                        created_at: Date.now()
                      })
                      .then(function(snapshot) {
                        // console.log('Snapshot', snapshot);
                      });
                  } else {
                    firebase
                      .database()
                      .ref('/users/' + result.user.uid)
                      .update({
                        last_logged_in: Date.now()
                      });
                  }
                })
                .catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // The email of the user's account used.
                  var email = error.email;
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential;
                  // ...
                });
            } else {
              console.log('User already signed-in Firebase.');
            }
          }.bind(this)
        );
    }
    signIn = async () => {

        try {
            const result = await Expo.Google.logInAsync({
                
            behavior: 'web',
            androidClientId: "247347328313-m42ov1f405ms2mtrt3t8fnl0d6v26gln.apps.googleusercontent.com",
            iosClientId: "247347328313-oi07a91amc4av9lgv3g9tb67nigt9o61.apps.googleusercontent.com",
            scopes: ['profile', 'email']
          });
    
          if (result.type === 'success') {
            this.setState({login: true});
            this.onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      };

    render() {
        return (
            <View style={styles.container}>
              {this.state.login ? 
              <ActivityIndicator size="large"/> 
              : 
              <View style = { styles.welcomeWrapper }>
                <Image 
                  source = { require('../assets/logo.png') }
                  style = { styles.logo }
                />
                <Text style = { styles.welcomeText }>
                  Welcome to FuelPe.
                </Text>
                <RoundedButton 
                  text = "Continue with Google"
                  textColor = {colors.red01}
                  background = {colors.white}
                  icon = { <Ionicons name="logo-googleplus" size={20} style={styles.googleButtonIcon} /> }
                  handleOnPress={this.signIn}
                />
                <View style={styles.footContainer}>
                  <Text style={styles.footText}>By clicking continue, I agree to FuelPe's </Text>
                    <TouchableHighlight style={styles.linkOption} onPress={()=>Linking.openURL('http://www.google.com')}>
                      <Text style={styles.footText}>Terms of Service</Text>
                    </TouchableHighlight>
                    <Text style={styles.footText}>, </Text>
                    <TouchableHighlight style={styles.linkOption}>
                      <Text style={styles.footText} onPress={()=>Linking.openURL('http://www.google.com')}>Payments Terms of Service</Text>
                    </TouchableHighlight>
                    <Text style={styles.footText}> and </Text>
                    <TouchableHighlight style={styles.linkOption}>
                      <Text style={styles.footText} onPress={()=>Linking.openURL('http://www.google.com')}>Privacy Policy</Text>
                    </TouchableHighlight>
                    <Text style={styles.footText}>.</Text>
                </View>
              </View>
            }
               
            </View>
        )
    }
}
export default LoginScreen;


const styles = StyleSheet.create ({
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
    padding: 20,
    paddingLeft: 30,
    paddingRight: 20,
  },
  logo: {
    width: 50,
    height: 80,
    marginBottom:30,
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
