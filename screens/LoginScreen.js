import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    AsyncStorage
} from "react-native";
import { Google } from 'expo';
import firebase from 'firebase';
import  '../utils/YellowWaringFix';
import { OauthCreds } from '../config'

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
                    await AsyncStorage.setItem('user_info',JSON.stringify(result.additionalUserInfo.profile))
                  }catch(err){
                    console.log("async store err", err);
                  }
                })
                .then(function(result) {
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
            androidClientId: OauthCreds.AndroidAPI,
            iosClientId: OauthCreds.IosAPI,
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
              <Button 
              title ="Sign in with Google"
              onPress={()=>this.signIn()}
              />
            }
               
            </View>
        )
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white'
    }
});