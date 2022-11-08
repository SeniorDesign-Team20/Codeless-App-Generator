import React, {useState} from 'react';
import { StyleSheet, Text, Image,TouchableOpacity, Button, View, TextInput} from 'react-native';

//Allow user to enter account names
export default function EnterFeatures({confirmHandle}) {
    var[defaultText, EnterText] = useState('');

    const redirect = (val) =>(
        EnterText(val)
    )
    return(
     <View style={styles.enter}>
         <TextInput 
         style = {styles.enter}
         placeholder ='Enter Features Here ... '
         onChangeText={redirect}>
         </TextInput>
         <Button 
           style = {styles.ConfirmButton}
           title="Confirm" 
           color ='green'
           onPress={() => confirmHandle(defaultText)}
            />
      </View>
    )
 } 

 const styles = StyleSheet.create({
    enter:{
        textAlign: 'flex-end',
        fontSize:'16',
        marginBottom: 10,
        marginTop:100,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        width: 400
        //fontweight:'bold'
    },
    ConfirmButton:{
        padding: 20,
        fontSize: 15,
        fontFamily: "arial",
        width: 400,
        height: 40,
        textAlign: "center"
      }
})