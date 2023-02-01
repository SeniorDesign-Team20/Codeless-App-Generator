import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType, TokenResponse } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential, signOut } from 'firebase/auth';
import { Button, StyleSheet, View, TouchableOpacity } from 'react-native';
import jwtDecode from 'jwt-decode';
import Main from './Main'

// Initialize Firebase
initializeApp({
  apiKey: process.env.API_KEY,
 // apiKey: "AIzaSyCKb7hzV6JrrWShNYF6zPxNvDc-jxUEAlU",
  authDomain: "codeless-app-generator.firebaseapp.com",
  projectId: "codeless-app-generator",
  storageBucket: "codeless-app-generator.appspot.com",
  messagingSenderId: "${{ secrets.MESSAGINGSENDERID }}",
  appId: "${{ secrets.APPID }}",
  measurementId: "${{ secrets.MEASURMENTID }}"
});

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '201718739843-ocjvk939h3litgm9nsqrco7k4jnr39fq.apps.googleusercontent.com',
    },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
      setIsSignedIn(true);
      const decodedToken = jwtDecode(id_token);
      console.log(decodedToken);
      //console.log(response)
      //console.log(credential)
      //console.log(id_token)
    }
    console.log(response?.type)
  }, [response]);

  const handleSignOut = () => {
    const auth = getAuth();
    setIsSignedIn(false);
    signOut(auth);
  };

  return (
    <View style={styles.container}>
      {isSignedIn ? (
        <>
          <Main/>
          <Button title="Logout" color = 'steelblue' onPress={() => {handleSignOut();}} />
        </>
      ) : (
        <View style = {[styles.loginButton, { width: 100, height:100 }]}>
          <Button
            height = '100'
            width = '100'           
            color = 'steelblue'
            disabled={!request}
            title="Login"
            onPress={() => {
              promptAsync();
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'cream'
      },
      loginButton: {
        flex:3,
        alignSelf: 'center',
        justifyContent: 'center',
      }
    })
