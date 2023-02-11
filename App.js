import * as React from 'react';
//import Config from 'react-native-config';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType, TokenResponse } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential, signOut } from 'firebase/auth';
import { Button, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
//import { Octokit } from '@octokit/core';
//import getSecrets from './getSecrets';
import jwtDecode from 'jwt-decode';
import Main from './Main'
//import DropdownExample from './DropDown';
//import Firebase from './firebase';
//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
// Initialize Firebase
//const key = process.env.FIREBASE_API_KEY

// const octokit = new Octokit({
//   auth: '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'
// });

// const getSecretValue = async () => {
//   try
//   {
//     const {response} = await octokit.request('GET /orgs/{org}/actions/secrets/{secret_name}', {
//       org: 'BU Engineering Senior Design - Team 20',
//       secret_name: 'FIREBASEAPIKEY'
//     });
//     //const secretValue = response.data.value;
//     console.log(response);
//   }
//   catch(error)
//   {
//     console.error(error);
//   }
// };
// const {response} = await octokit.request('GET /orgs/{org}/actions/secrets/{secret_name}', {
//   org: 'BU Engineering Senior Design - Team 20',
//   secret_name: 'FIREBASEAPIKEY'
// });

// console.log(response)
//console.log(getSecrets());

const firebaseConfig = {
  apiKey: "${{ secrets.FIREBASEAPIKEY }}",
  authDomain: "codeless-app-generator.firebaseapp.com",
  projectId: "codeless-app-generator",
  storageBucket: "codeless-app-generator.appspot.com",
  messagingSenderId: "${{ secrets.MESSAGINGSENDERID }}",
  appId: "${{ secrets.APPID }}",
  measurementId: "${{ secrets.MEASURMENTID }}"
};
initializeApp(firebaseConfig);
  // //apiKey: "${{ secrets.FIREBASEAPIKEY }}",
  // authDomain: "codeless-app-generator.firebaseapp.com",
  // projectId: "codeless-app-generator",
  // storageBucket: "codeless-app-generator.appspot.com",
  // messagingSenderId: "${{ secrets.MESSAGINGSENDERID }}",
  // appId: "${{ secrets.APPID }}",
  // measurementId: "${{ secrets.MEASURMENTID }}"
//});

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '201718739843-ocjvk939h3litgm9nsqrco7k4jnr39fq.apps.googleusercontent.com',
    },
  );
  const [firstName, setFirstName] = React.useState("")
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
      setIsSignedIn(true);
      const decodedToken = jwtDecode(id_token);
      console.log("User: ")
      console.log(decodedToken.given_name);
      setFirstName(decodedToken.given_name)
      //console.log(response)
      //console.log(credential)
      //console.log(id_token)
    }
    console.log("Sign in Result: ")
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
        <View style={styles.toppart}>
              <Text style={styles.welcomenote}>Codeless App Generator!</Text>
              <Text style={styles.greeting}> Hello, {firstName}</Text>             
          {/*<DropdownExample name = {firstName}/>*/}
        </View>
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
      },
      toppart:{
        height: "500",
        width: "100%",
        paddingTop:29,
        backgroundColor:'steelblue',
        alignItems: "center",
        justifyContent: "center"
    },
    welcomenote:{
        textAlign: "center",
        fontSize:18,
        fontWeight:'bold',
        color: 'white',
        paddingBottom: 30
    },
    greeting: {
        position: "absolute",
        top: 29,
        right: 30,
        fontSize:18,
        fontWeight:'bold',
        color: 'white',
    }
    })
