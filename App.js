import { StyleSheet, View, Alert, FlatList, Button, Text, TextInput } from "react-native";
import { useState } from "react";
import Checkbox from "./CheckBox";
import Top from './title';
//import displaySelection from "./DisplaySelection";
import EnterFeatures from "./inputFeatures";
import appendFeature from "./AppendFeatures"; 
//import confirmFeatures from "./DisplaySelection";

//import CheckBox from '@react-native-community/checkbox';

export default function App() {
    const [feature1, set1] = useState(false);
    const [feature2, set2] = useState(false);
    const [feature3, set3] = useState(false);
    const [feature4, set4] = useState(false);
    const [feature5, set5] = useState(false);
    const [selectedFeatures, setFeatures] = useState([]);
    const setFeat1 = (feat) => {
      set1(!feat);
      if (!feat)
      {
        setFeatures(arr => [...arr, "Feature1"])
      }
      console.log(selectedFeatures.toString())
    }
    const setFeat2 = (feat) => {
      set2(!feat);
      if (!feat)
      {
        setFeatures(arr => [...arr, "Feature2"])
      }
      console.log(selectedFeatures.toString())
    }
    const setFeat3 = (feat) => {
      set3(!feat);
      if (!feat)
      {
        setFeatures(arr => [...arr, "Feature3"])
      }
      console.log(selectedFeatures.toString())
    }
    const setFeat4 = (feat) => {
      set4(!feat);
      if (!feat)
      {
        setFeatures(arr => [...arr, "Feature4"])
      }
      console.log(selectedFeatures.toString())
    }
    const setFeat5 = (feat) => {
      set5(!feat);
      if (!feat)
      {
        setFeatures(arr => [...arr, "Feature5"])
      }
      console.log(selectedFeatures.toString())
    }

    var[defaultText, EnterText] = useState('');
    const confirmFeatures = (inputText) => {
        setFeatures(arr => [...arr, inputText])
    }
    const redirect = (val) =>(
      EnterText(val)
    )
    return (
        <View style={styles.container}>
            <Top style = {styles.titleStyle}/>
            <View syle={styles.chooseFeaturesContainer}>
                <Checkbox
                  onPress = {() =>{setFeat1(feature1)}}
                  title="Example Feature 1"
                  isChecked={feature1}
                />
                <Checkbox
                  onPress = {() => setFeat2(feature2)}
                  title="Example Feature 2"
                  isChecked={feature2}
                />
                <Checkbox
                  onPress={() => setFeat3(feature3)}
                  title="Example Feature 3"
                  isChecked={feature3}
                />
                <Checkbox
                  onPress={() => setFeat4(feature4)}
                  title="Example Feature 4"
                  isChecked={feature4}
                />
                <Checkbox
                  onPress={() => setFeat5(feature5)}
                  title="Example Feature 5"
                  isChecked={feature5}
                />    
                <TextInput
                  style = {styles.enter}
                  placeholder ='Enter Features Here ... '
                  onChangeText={redirect}>
                </TextInput>
                <Button 
                  style = {styles.ConfirmButton}
                  title="Confirm" 
                  color ='green'
                  onPress={() => confirmFeatures(defaultText)}
                />
            </View>
            <View style = {styles.displaySelectionContainer}>
                <Text> You selected: {selectedFeatures.toString()}</Text>
            </View>
            
        </View>
      );
    }
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        justifyContent: "flex-start",
        alignItems: "flex-start"
        //top: 0
      },
    chooseFeaturesContainer: {
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    titleStyle: {
      //flex: 1,
      fontFamily: "Cochin",
      top: 0
    },
    ConfirmButton:{
      //padding: 20,
      //fontSize: 15,
      //fontFamily: "arial",
      
      //justifyContent: "center"
      alignSelf: "stretch"
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    displaySelectionContainer: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "flex-end",
      alignItems:"flex-end",
      flexDirection: "row"
    },
    enter:{
      textAlign: 'flex-end',
      fontSize:'16',
      marginBottom: 10,
      marginTop:100,
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      width: 400},
    outputText:{
      
    }
});

