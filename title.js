import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image,TouchableOpacity, Button, View } from 'react-native';

export default function Top() {
   return(
    <View style={styles.toppart}>
        <Text style = {styles.welcomenote}>Codeless App Generator!</Text>            
     </View>
   )
}

const styles = StyleSheet.create({
    toppart:{
        height: "500",
        width: "100%",
        paddingTop:29,
        backgroundColor:'steelblue',
        alignItems: "center",
        alignSelf: "flex-start"
    },
    welcomenote:{
        alignItems: "center",
        textAlign: "center",
        fontSize:'30',
        fontWeight:'bold',
        color: 'white',
        paddingBottom: 30
    }
})