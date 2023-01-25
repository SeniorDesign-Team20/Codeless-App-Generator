import { StyleSheet, View, Alert, FlatList, Button, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import Checkbox from "./CheckBox";
//import Firebase from "./firebase";
import Top from './title';
//import displaySelection from "./DisplaySelection";
//import EnterFeatures from "./inputFeatures";
//import appendFeature from "./AppendFeatures"; 



export default function App() {
    const [feature1, set1] = useState(false);
    const [feature2, set2] = useState(false);
    const [feature3, set3] = useState(false);
    const [feature4, set4] = useState(false);
    const [feature5, set5] = useState(false);

    //const [url, seturl] = useState('');

    // useEffect(() => {
    //   Firebase().then((res) => {
    //     seturl(res);
    //   })

    // }, [])

    

    //var [features, setFeatures] = useState([]);
    
    const [selectedFeatures, setFeatures] = useState([]);

    const setFeat1 = (feat) => {
      set1(!feat);
      if (!feat)
      {
        setFeatures(arr => [...arr, "Feature1"])
      }
      else{
        const index = selectedFeatures.indexOf("Feature1")
        selectedFeatures.splice(index, 1)
      }
      console.log(selectedFeatures.toString())
    }

    const setFeat2 = (feat) => {
      set2(!feat);
      if (!feat)
      {
        setFeatures(arr => [...arr, "Feature2"])
      }
      else{
        const index = selectedFeatures.indexOf("Feature2")
        selectedFeatures.splice(index, 1)
      }
      console.log(selectedFeatures.toString())
    }

    const setFeat3 = (feat) => {
      set3(!feat);
      if (!feat)
      {
        setFeatures(arr => [...arr, "Feature3"])
      }
      else{
        const index = selectedFeatures.indexOf("Feature3")
        selectedFeatures.splice(index, 1)
      }
      console.log(selectedFeatures.toString())
    }

    const setFeat4 = (feat) => {
      set4(!feat);
      if (!feat)
      {
        setFeatures(arr => [...arr, "Feature4"])
      }
      else{
        const index = selectedFeatures.indexOf("Feature4")
        selectedFeatures.splice(index, 1)
      }
      console.log(selectedFeatures.toString())
    }

    const setFeat5 = (feat) => {
      set5(!feat);
      if (!feat)
      {
        setFeatures(arr => [...arr, "Feature5"])
      }
      else{
        const index = selectedFeatures.indexOf("Feature5")
        selectedFeatures.splice(index, 1)
      }
      console.log(selectedFeatures.toString())
    }

    var[defaultText, EnterText] = useState('');

    const confirmFeatures = (inputText) => {
        
        setFeatures(arr => [...arr, inputText])
    }

    const removeFeature = () => {
        let featureToRemove = selectedFeatures.slice(-1)[0] 
        switch (featureToRemove)
        {
          case "Feature1":
            set1(false)
          case "Feature2":
            set2(false)
          case "Feature3":
            set3(false)
          case "Feature4":
            set4(false)
          case "Feature5":
            set5(false)
        }
        setFeatures(arr => arr.slice(0, -1))
    }

    const redirect = (val) =>(
      EnterText(val)
    )

    return (
        <View style={styles.container}>
            <View style = {styles.titleContainer}>
              <Top style = {styles.titleStyle}/>
            </View>
            <View style = {styles.contentContainer}>
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
                    value = {defaultText}
                    onFocus={() => EnterText(' ')}
                    onSubmitEditing = {() => confirmFeatures(defaultText)}
                    placeholder ='Enter a feature here ... '
                    onChangeText={redirect}
                    >
                  </TextInput>
                  <Button 
                    style = {styles.ConfirmButton}
                    title="Add Feature" 
                    color ='green'
                    onPress={() => confirmFeatures(defaultText)}
                  />

                  <FlatList
                      data = {selectedFeatures}
                      renderItem={({ item }) => (
                        <View style={styles.bullet}>
                          <Text>&#8226; {item}</Text>
                        </View>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                  />
                  <Button
                    title="Remove Feature"
                    color='red'
                    onPress={() => removeFeature()}
                  />
                  <Button
                    title="Confirm Selections"
                    color='green'
                  />

              </View>
              <View style = {styles.displaySelectionContainer}>
              </View>
            </View>
        </View>
        
        
      );
    }
  
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "col",
        backgroundColor: "#fff",
        justifyContent: "flex-start",
        alignItems: "flex-start"
        //top: 0
      },
      titleContainer: {
        flexDirection: "row",
        alignSelf: "baseline",
        width: "100%"
      },
      contentContainer: {
        flex: 5,
        flexDirection: "row",
        // justifyContent: "space-between",
        // alignContent: "center"
      },
    chooseFeaturesContainer: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "flex-start",
      alignItems: "space-between",
      flexDirection: "row",
      width: "50%",
      flexWrap: "wrap",
      
    },
    titleStyle: {
      //flex: 1,
      fontFamily: "Cochin",
      top: 0
    },
    ConfirmButton:{
      marginTop: 100,
      marginBottom: 100
      //fontSize: 15,
      //fontFamily: "arial",
      
      //justifyContent: "center"
      //alignSelf: "stretch",
      //width: "50%"
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    displaySelectionContainer: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "flex-start",
      alignSelf:"flex-start",
      flexDirection: "row"
    },

    enter:{
      textAlign: 'flex-end',
      fontSize:'16',
      marginBottom: 10,
      marginTop:50,
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      width: 750},
    
});

                  {/* <Text 
                      style = {
                        {
                          flex: 1, 
                          flexWrap: "wrap", 
                          flexShrink:1,
                          fontSize:18,
                          color: "black",
                        }}>
                     {'\n'}
                     You selected: {selectedFeatures.toString()}
                     {'\n'}
                  </Text> */}