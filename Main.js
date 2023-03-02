import { StyleSheet, View, Alert, FlatList, Button, Text, TextInput, TouchableOpacity, Linking } from "react-native";
import { useState, useEffect } from "react";
import Checkbox from "./CheckBox";
import Firebase from "./firebase";
import modifyFile from "./ModifyFile"

export default function Main() {
    
    const fileNameMappings = {
      "Google Sign-In": "Google_Login",
      "Weather": "Weather",
      "Calendar" : "Calendar",
      "People Page": "People",
      "FAQ Page": "FAQs.js"
    };

    const [feature1, set1] = useState(false);
    const [feature2, set2] = useState(false);
    const [feature3, set3] = useState(false);
    const [feature4, set4] = useState(false);
    const [feature5, set5] = useState(false);
    
    const [selectedFeatures, setFeatures] = useState([]);
    //const [test, setFeaturesToExclude] = useState([]);
    const [selectedFiles, setFiles] = useState([]);
    const [selectedBools, setBools] = useState([]);
    const [url, seturl] = useState('');
    // "googleLogin": false,
    // "weather": false,
    // "calendar": false,
    // "people": false,
    // "faq":false
    //newFunction(seturl, selectedFiles);
    
    console.log(url);
    const setFeat1 = (feat) => {
      set1(!feat);
      if (!feat)
      {
        setFeatures(arr => [...arr, "Google Sign-In"])
        setFiles(arr => [... arr, fileNameMappings["Google Sign-In"]])
        setBools(arr => [... arr, "googleLogin"])
      }
      else{
        const index = selectedFeatures.indexOf("Google Sign-In")
        selectedFeatures.splice(index, 1)
        selectedFiles.splice(index, 1)
      }
      console.log(selectedFeatures.toString())
    }

    const setFeat2 = (feat) => {
      set2(!feat);
      if (!feat)
      {
        setFeatures(arr => [...arr, "Weather"])
        setFiles(arr => [... arr, fileNameMappings["Weather"]])
        setBools(arr => [... arr, "weather"])

      }
      else{
        const index = selectedFeatures.indexOf("Weather")
        selectedFeatures.splice(index, 1)
        selectedFiles.splice(index,1)
      }
      console.log(selectedFeatures.toString())
    }

    const setFeat3 = (feat) => {
      set3(!feat);
      if (!feat)
      {
        setFeatures(arr => [...arr, "Calendar"])
        setFiles(arr => [...arr, fileNameMappings["Calendar"]])
        setBools(arr => [... arr, "calendar"])
      }
      else{
        const index = selectedFeatures.indexOf("Calendar")
        selectedFeatures.splice(index, 1)
        selectedFiles.splice(index,1)
      }
      console.log(selectedFeatures.toString())
    }

    const setFeat4 = (feat) => {
      set4(!feat);
      if (!feat)
      {
        setFeatures(arr => [...arr, "People Page"])
        setFiles(arr => [...arr, fileNameMappings["People Page"]])
        setBools(arr => [... arr, "people"])
      }
      else{
        const index = selectedFeatures.indexOf("People Page")
        selectedFeatures.splice(index, 1)
        selectedFiles.splice(index,1)
      }
      console.log(selectedFeatures.toString())
    }

    const setFeat5 = (feat) => {
      set5(!feat);
      if (!feat)
      {
        setFeatures(arr => [...arr, "FAQ Page"])
        setFiles(arr => [...arr, fileNameMappings["FAQ Page"]])
        setBools(arr => [... arr, "faq"])
      }
      else{
        const index = selectedFeatures.indexOf("FAQ Page")
        selectedFeatures.splice(index, 1)
        selectedFiles.splice(index, 1)
      }
      console.log(selectedFeatures.toString())
    }

    var[defaultText, EnterText] = useState('');

    const addFeature = (inputText) => {
      if (inputText == "" || inputText == " ")
        return  
      redirect('')
      setFeatures(arr => [...arr, inputText])
    }

    const removeFeature = () => {
        let featureToRemove = selectedFeatures.slice(-1)[0] 
        switch (featureToRemove)
        {
          case "Google Sign-In":
            set1(false)
          case "Weather":
            set2(false)
          case "Calendar":
            set3(false)
          case "People Page":
            set4(false)
          case "FAQ Page":
            set5(false)
        }
        setFeatures(arr => arr.slice(0, -1))
        setFiles(arr => arr.slice(0, -1))
        setBools(arr => arr.slice(0, -1))
    }

    const getFeaturesToExclude = () => {
      const featuresToExclude = [];
      for (const element in fileNameMappings){
        if (!selectedFeatures.includes(element)){
          featuresToExclude.push(fileNameMappings[element])
        }
      }
      console.log('Excluded Features:');
      console.log(featuresToExclude);
      return featuresToExclude;
    }

    const redirect = (val) =>(
      EnterText(val)
    )

    return (
        <View style={styles.container}>
            <View style = {styles.contentContainer}>
              <View syle={styles.chooseFeaturesContainer}>
                    <Checkbox
                      onPress = {() =>{setFeat1(feature1)}}
                      title="Google Sign-In"
                      isChecked={feature1}
                    />
                    <Checkbox
                      onPress = {() => setFeat2(feature2)}
                      title="Weather"
                      isChecked={feature2}
                    />
                    <Checkbox
                      onPress={() => setFeat3(feature3)}
                      title="Calendar"
                      isChecked={feature3}
                    />
                    <Checkbox
                      onPress={() => setFeat4(feature4)}
                      title="People Page"
                      isChecked={feature4}
                    />
                    <Checkbox
                      onPress={() => setFeat5(feature5)}
                      title="FAQ Page"
                      isChecked={feature5}
                    />    
                    <TextInput
                      style = {styles.enter}
                      placeholder ='Enter a feature here ... '
                      value = {defaultText}
                      onFocus={() => EnterText('')}
                      onChangeText={(text) => EnterText(text)}
                      onSubmitEditing = {() => addFeature(defaultText)}
                      >
                    </TextInput>

                    <View style = {{flexDirection:'row', justifyContent:'space-evenly'}}>
                      <TouchableOpacity style = {styles.confirmButton} onPress={() => addFeature(defaultText)}>
                          <Text style = {styles.textStyle}>    Add  Feature    </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style = {styles.removeFeatureButton} onPress={() => removeFeature()}>
                          <Text style = {styles.textStyle}>    Remove Feature    </Text>
                      </TouchableOpacity>
                    </View>

                    <FlatList
                        data = {selectedFeatures}
                        renderItem={({ item }) => (
                          <View style={styles.bullet}>
                            <Text style={
                              { fontSize: 18,
                                color: "#000",
                                marginLeft: 15,
                                fontWeight: "600",
                              } 
                          }>&#8226; {item}</Text>
                          </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    
                    <View style = {styles.confirmSelectionsButton}>
                      <TouchableOpacity 
                          style = {styles.confirmButton} 
                          onPress={() => generateRequestFromFiles(seturl, selectedBools, getFeaturesToExclude())}
                      >
                        <Text style = {styles.textStyle}> Confirm Selections </Text>
                      </TouchableOpacity>
                    </View>

                </View>
                <View style = {styles.generateDownloadAppContainer}> 
                      {url ? (
                        <TouchableOpacity 
                            style = {styles.generateButton} 
                            onPress={() => Linking.openURL(url)}
                        >
                          <Text style = {styles.textStyle}>GENERATE & DOWNLOAD APP</Text>
                        </TouchableOpacity>
                      ) : (
                        <Text>Confirm Selections to Download App...</Text>
                      )}
                </View>
              
              <View style = {styles.displaySelectionContainer}>
              </View>
            </View>
        </View>
        
        
      );
    }
  
async function generateRequestFromFiles(seturl, fileList, excludedFeatures) {
  console.log(fileList);
  console.log('editing file...');
  await modifyFile(fileList);

  // Add in welcome note to all apps
  // fileList = [...fileList, "Welcome.pdf"]
  // fileList = [...fileList, "selected_features.js"]
  await Firebase('GeneratedApp', []).then((res) => {
      seturl(res);
  }, []);

  

}

  
const styles = StyleSheet.create({
    bullet: {
        paddingTop: 25
    },
    confirmButton: {
        backgroundColor: "darkgreen",
        borderRadius: 10,
        alignItems: "center",
        height: 40
    },
    removeFeatureButton: {
      backgroundColor: "coral",
      borderRadius: 10,
      alignItems: "center",
      height: 40
    },
    generateButton: {
      backgroundColor: "steelblue",
      borderRadius: 10,
      alignItems: "center",
      height: 40
    },
    textStyle:
    {
      textAlign: "center",
      fontSize:18,
      fontWeight:'bold',
      color: 'white',
      paddingTop:7,
      marginLeft: 30,
      marginRight: 30,
      marginBottom: 10
    },
    confirmSelectionsButton: {
      alignSelf: 'center',
      justifyContent: 'center',
      bottom: "3%",
      width: '50%',
      height: '10%',
    },
    container: {
        flex: 1,
        flexDirection: "col",
        backgroundColor: "#fff",
        justifyContent: "flex-start",
        alignItems: "flex-start"
      },
      titleContainer: {
        flexDirection: "row",
        alignSelf: "baseline",
        width: "100%"
      },
      contentContainer: {
        flex: 1,
        flexDirection: "row"
      },
    chooseFeaturesContainer: {
      // flex: 1,
      // backgroundColor: "#fff",
      // justifyContent: "flex-start",
      // alignItems: "space-evenly",
      // //flexDirection: "column",
      // flexWrap: "wrap",
      
    },
    titleStyle: {
      fontFamily: "Cochin",
      top: 0
    },
    ConfirmButton:{
      marginTop: 100,
      marginBottom: 100
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
      fontSize:'25',
      paddingLeft: 15,
      marginBottom: 10,
      marginTop:50,
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      width: "100%"},

      generateDownloadAppContainer: {

        //alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: "25%",
        //position: 'absolute',
        // bottom: "-50%",
        // left: "75%",
        //width: '50%',
        //height: '10%',
      },
    
});



