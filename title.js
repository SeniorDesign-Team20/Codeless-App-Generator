import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image,TouchableOpacity, Button, View } from 'react-native';

//Adding the top part that show "welcome to bot detector"
export default function Top() {
   return(
    <View style={styles.toppart}>
        <Text style = {styles.welcomenote}>Codeless App Generator!</Text>            
     </View>
   )
} 

const styles = StyleSheet.create({
    toppart:{
        height:80,
        width:500,
        paddingTop:29,
        backgroundColor:'#1e90ff',
        
    },
    welcomenote:{
        textAlign: 'center',
        fontSize:'20',
        fontWeight:'bold',
        color: 'white'
    }
})