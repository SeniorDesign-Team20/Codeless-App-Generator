import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential, signOut } from 'firebase/auth';
import { Button, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import jwtDecode from 'jwt-decode';
import Main from './Main'
//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


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
      setFirstName(decodedToken.given_name);
      console.log(decodedToken.given_name);
    }
    console.log("Sign in Result: ")
    console.log(response?.type)
  }, [response]);

  const handleSignOut = () => {
    const auth = getAuth();
    setIsSignedIn(false);
    setShowLogout(false);
    signOut(auth);
  };
  const [showLogout, setShowLogout] = React.useState(false);

  return (
    <View style={styles.container}>
      {isSignedIn ? (
        <>
        <View style={styles.toppart}>
          <Text style={styles.welcomenote}>Codeless App Generator!</Text>
            {!showLogout && (<TouchableOpacity style = {styles.greeting} onPress={() => setShowLogout(!showLogout)}>
              <Text style ={styles.greetingText}> Hello, {firstName} ▼</Text>
            </TouchableOpacity>)}
            {showLogout && (
              <TouchableOpacity style = {styles.greeting} onPress={() => handleSignOut()}>
                <Text style ={styles.greetingText}>Logout</Text>
              </TouchableOpacity>
            )}             
        </View>
        <Main/>
        {/* <Button title="Logout" color = 'steelblue' onPress={() => {handleSignOut();}} /> */}
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
    paddingTop:29,
    backgroundColor:'steelblue',
    alignItems: "center",
    justifyContent: "center"
  },
  welcomenote:{
      textAlign: "center",
      fontSize:30,
      fontWeight:'bold',
      color: 'white',
      paddingBottom: 30
  },
  greeting: {
      position: "absolute",
      top: 15,
      right: 30,
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 10,
      padding: 10,
  
  },
  greetingText: {
      fontSize:18,
      fontWeight:'bold',
      color: 'white',
  }
  })
