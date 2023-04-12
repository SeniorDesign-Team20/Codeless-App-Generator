// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, Image,TouchableOpacity, Button, View } from 'react-native';

// export default function Top() {
//    return(
//     <View style={styles.toppart}>
//         <Text style = {styles.welcomenote}>Codeless App Generator!</Text><Text style = {styles.welcomenote}> TEST </Text>            
//      </View>
//    )
// }

// const styles = StyleSheet.create({
//     toppart:{
//         height: "500",
//         width: "100%",
//         paddingTop:29,
//         backgroundColor:'steelblue',
//         alignItems: "column",
//         alignSelf: "flex-start"
//     },
//     welcomenote:{
//         alignItems: "center",
//         textAlign: "center",
//         fontSize:'30',
//         fontWeight:'bold',
//         color: 'white',
//         paddingBottom: 30
//     },
//     greeting: {
//         alignItems: "flex-end",
//         textAlign: "flex-end",
//         fontSize:'30',
//         fontWeight:'bold',
//         color: 'white',
//         paddingBottom: 30
//     }
// })

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image,TouchableOpacity, Button, View } from 'react-native';

export default function Top() {
   return(
    <View style={styles.toppart}>
        <Text style = {styles.welcomenote}>Codeless App Generator!</Text>
        <Text style = {styles.greeting}> TEST </Text>            
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
        top: 29,
        right: 0,
        fontSize:30,
        fontWeight:'bold',
        color: 'white',
    }
})

// const styles = StyleSheet.create({
//     toppart:{
//         height: "500",
//         width: "100%",
//         paddingTop:29,
//         backgroundColor:'steelblue',
//         alignItems: "flex-start",
//         justifyContent: "flex-start"
//     },
//     welcomenote:{
//         alignItems: "center",
//         textAlign: "center",
//         fontSize:30,
//         fontWeight:'bold',
//         color: 'white',
//         paddingBottom: 30
//     },
//     greeting: {
//         position: "absolute",
//         top: 29,
//         right: 0,
//         fontSize:30,
//         fontWeight:'bold',
//         color: 'white',
//     }
// })
