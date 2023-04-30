import { StyleSheet, View, Alert, FlatList, Button, Text, TextInput, TouchableOpacity, Linking } from "react-native";
import { useState, useEffect } from "react";
import Checkbox from "./CheckBox";
import Firebase from "./firebase";
import modifyFile from "./ModifyFile"
import {processText, makePrediction} from "./NLP";
import Lottie from 'lottie-react';
import { Speech, isAvailableAsync } from 'expo-speech';
import Voice from '@react-native-community/voice';
import * as Permissions from 'expo-permissions';
import SpeechToTextWeb from './SpeechToTextWeb';


export default function Main() {
    
    const fileNameMappings = {
      "About Page": "About",
      "Activity Feed": "Activity",
      "Application Page": "Apply",
      "Calculator": "Calculator",
      "Calendar" : "Calendar",
      "Chatbot": "Chatbot",
      "Contact Form": "Contact",
      "Discussion Forum": "Chat",
      "FAQ Page": "FAQs",
      "File Upload": "File_Upload",
      "Google Sign-in": "Google_Login",
      "Job Openings": "Careers",
      "Map": "Map",
      "Menu": "Menu",
      "Online Store": "Shopping",
      "People Page": "People",
      "Photobooth": "Photo_Booth",
      "Privacy Policy": "Privacy",
      "QR Code Scanner": "QR",
      "Reviews": "Reviews",
      "Weather": "Weather",
      "FAQ Page": "FAQs"
    };

    const nlpFeatures = ["About Page", "Activity Feed", "Application Page", "Calculator", "Calendar", "Chatbot",
                         "Contact Form", "Discussion Forum", "FAQ Page", "File Upload", "Google Sign-in", "Job Openings", 
                         "Map", "Menu", "Online Store", "People Page", "Photobooth", "Privacy Policy", "QR Code Scanner", 
                         "Reviews", "Weather"];

    const boolMappings = {
      "Google_Login": "googleLogin",
      "Weather": "weather",
      "Calendar": "calendar",
      "People": "people",
      "FAQs": "faq",
      "About": "about",
      "Activity Feed": "activityFeed",
      "Apply": "apply",
      "Calculator": "calculator",
      "Chatbot": "chatbot",
      "Contact": "contact",
      "Discussion Forum": "chat",
      "File_Upload": "fileUpload",
      "Careers": "careers",
      "Map": "map",
      //"Menu": "",
      "Shopping": "products",
      "People": "people",
      "Photo_Booth": "photoBooth",
      "Privacy": "privacy",
      "QR": "qr",
      "Reviews": "reviews",
      //"Store Hours": "hours",
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
    const [userRequests, setUserRequests] = useState([]);
    const [translatedRequests, setTranslatedRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [transcript, setTranscript] = useState('');
    console.log(url);

    const [loadingItemIndex, setLoadingItemIndex] = useState(0);
    const [predictions, setPredictions] = useState([]);
    const [nextBest, setNextBest] = useState([]);

    var[defaultText, EnterText] = useState('');

    const handleTranscriptChange = (newTranscript) => {
      setTranscript(newTranscript);
    };

    const addFeature = (inputText) => {
      // if nothing in speech to text take input text
      const featureToAdd = transcript !== "" ? transcript : inputText;
      if (featureToAdd == "" || featureToAdd == " ")
        return  
        // redirect('')
        // setFeatures(arr => [...arr, featureToAdd])
        // setUserRequests(arr => [...arr, featureToAdd])
        // //getPrediction(inputText, fileNameMappings, boolMappings)

      redirect('')
      setFeatures(arr => [...arr, featureToAdd])
      setUserRequests(arr => [...arr, featureToAdd])
      console.log('User requests length: %d', userRequests.length)
      if (userRequests.length === 0)
      {
        console.log('checked')
        setLoadingItemIndex(0);
        console.log('%d', loadingItemIndex)
      }
      else {
        setLoadingItemIndex(userRequests.length-1)
      }
      setUserRequests(arr => arr.slice(1))
      predict(featureToAdd); 
      setTranscript(''); 
    }

    const swapFeatures = (item, key, index, index1) => {
      const updatedNextBest = JSON.parse(JSON.stringify(item));
      const mainPrediction = item.prediction;
      const featureToSwap = key;

      updatedNextBest.prediction = featureToSwap;
      updatedNextBest.topFour[mainPrediction] = {confidence:1};
      delete updatedNextBest.topFour[featureToSwap];
      
      const temp1 = [...nextBest];
      temp1[index] = updatedNextBest;
      
      setNextBest(temp1);
      //swap within master feature list
      const temp2 = [...translatedRequests];
      // console.log(index);
      // console.log(featureToSwap);
      // console.log("temp2")
      // console.log(temp2);
      temp2[index] = featureToSwap;
      // console.log("new temp2");
      // console.log(temp2);
      setTranslatedRequests([...temp2]);
      //console.log(translatedRequests);

    }

    const removeFeature = () => {

    }

    const clearAll = () => {
        setNextBest([])
        setFeatures([])
        setFiles([])
        setBools([])
        setTranslatedRequests([])
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

    const [test, setTest] = useState("");
    
    const generateApp = async () => {
      setIsLoading(true); // set loading to true
      console.log("Starting loading");
      const bools = translatedRequests.map(feature => {
        const fileName = fileNameMappings[feature];
        return boolMappings[fileName];
      });
      
      setBools(arr => [...arr, bools]);
      console.log(selectedBools);
      await generateRequestFromFiles(seturl, selectedBools);//, userRequests, setTranslatedRequests, translatedRequests, fileNameMappings, boolMappings);
      //setIsGenerating(false); // set loading back to false
      setIsLoading(false);
    };

    const predict = async (input) => {
      console.log("getting prediction");
        // Code to be executed asynchronously after 3 seconds
      await getPrediction(setTranslatedRequests, input, fileNameMappings, boolMappings, setBools, setNextBest);
      console.log("got prediction");
    }

    const removeItemAtIndex = (index) => {
      console.log()
      setNextBest(arr => [...arr.slice(0, index), ...arr.slice(index + 1)]);
      setFeatures(arr => [...arr.slice(0, index), ...arr.slice(index + 1)]);
    }

        return (
        <View style={styles.container}>
            <View style = {styles.contentContainer}>
              <View syle={styles.chooseFeaturesContainer}>
                <View style={styles.instructionsContainer}>
                  <Text style={styles.instructions}> 1. Enter what features you would like to be in your app below {'\n'} </Text>
                  <Text style={styles.instructions}> 2. Confirm your entries to get the available features {'\n'} </Text>
                  <Text style={styles.instructions}> 3. Generate your app {'\n'} </Text>
                  <Text style={styles.instructions}> 4. Download your app in a .zip </Text>
                </View>

                    <Text style = {styles.recognizedTextStyle}> {'\n'} Text to Speech Input here: {'\n'} </Text>
                    <SpeechToTextWeb onTranscriptChange={handleTranscriptChange} />
                    <Text> Transcript: {transcript} </Text>
                    <TextInput
                      style = {styles.enter}
                      placeholder ="Enter a feature here ... "
                      value = {defaultText}
                      onFocus={() => EnterText('')}
                      onChangeText={(text) => EnterText(text)}
                      onSubmitEditing = {() => addFeature(defaultText)}
                      >
                    </TextInput>

                    <View style = {{flexDirection:'row', justifyContent:'space-evenly'}}>
                      <TouchableOpacity style = {styles.addFeatureButton} onPress={() => addFeature(defaultText)}>
                          <Text style = {styles.textStyle}>    Add  Feature    </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style = {styles.removeFeatureButton} onPress={() => clearAll()}>
                          <Text style = {styles.textStyle}>    Restart    </Text>
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
                          onPress={() => generateApp()}
                      >
                        <Text style = {styles.textStyle}> Confirm Selections </Text>
                      </TouchableOpacity>
                    </View>

                </View>
                {isLoading ? (
                <View style={{ alignSelf: 'center', paddingLeft:200}}>
                    <Lottie
                      animationData={require('./assets/98432-loading.json')}
                      autoPlay
                      loop
                      style={{width: '75%', height: '75%'}}
                    />
                  </View>
                  ):(
                <View style ={styles.nlpPredictionsContainer}>      
                    <Text> Here are the features we think you have requested.
                             {"\n"} If any don't seem right, you can add more or remove any
                             {"\n"} using the +/- buttons.          
                    </Text>
                    
                  <FlatList
                    data={nextBest}
                    renderItem={({ item, index }) => (
                      <View style={styles.bullet}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: "#000",
                            marginLeft: 15,
                            fontWeight: "600",
                          }}
                        >
                          &#8226; {item.prediction} {"  "}
                          <TouchableOpacity style={{backgroundColor: "coral",
                                                    borderRadius: 8,
                                                    paddingLeft: 15,
                                                    paddingRight: 15,}}
                                            onPress={() => removeItemAtIndex(index)}>
                              <Text style={{fontSize:16,
                                            fontWeight:'bold',
                                            color: 'white'}}> 
                                Remove  </Text>
                                {/* <FontAwesomeIcon icon={faMinus} style={{color: "white",}} /> */}
                          </TouchableOpacity>
                        </Text>
                        {Object.entries(item.topFour).map(([key, value], index1) => (
                          <View key={index1} style={styles.bullet}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: "#000",
                                marginLeft: 30,
                                fontWeight: "500",
                              }}
                            >
                              &#8226; Did you mean {key}? {"  "}
                              <TouchableOpacity style={{backgroundColor: "darkgreen",
                                                        borderRadius: 8,
                                                        paddingLeft: 15,
                                                        paddingRight: 15,
                                                      }}
                                                onPress={() => swapFeatures(item, key, index, index1)}
                                                      
                                                      >
                              <Text style={{fontSize:16,
                                            fontWeight:'bold',
                                            color: 'white'}}> 
                                Yes </Text>
                                {/* <FontAwesomeIcon icon={faRetweet} style={{color: "white",}} /> */}
                            </TouchableOpacity>
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />

                      
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
                </View>
                  )}
              <View style = {styles.displaySelectionContainer}>
              </View>
            </View>
        </View>
        
        
      );
    }
  
    async function generateRequestFromFiles(seturl, selectedBools) {
      //console.log(fileList);
      console.log('editing file...');
  
      // const {predictions, mappedPredictions, mappedBools} = await processText(userRequests, fileNameMappings, boolMappings);
      // setTranslatedRequests(predictions);
      // console.log(translatedRequests);
      // console.log(mappedPredictions);
      // console.log(mappedBools);
      await modifyFile(selectedBools);
      //console.log(translatedRequests);
      //setPredictions(translatedRequests.)
      await Firebase('GeneratedApp1', []).then((res) => {
          seturl(res);
      }, []);
  
  }

  async function getPrediction(setTranslatedRequests, userRequests, fileNameMappings, boolMappings, setBools, setNextBest){
    const predictions = await makePrediction(userRequests, fileNameMappings, boolMappings);
    setNextBest(arr => [...arr, predictions])
    const prediction = predictions['prediction']

    console.log(prediction);
    setTranslatedRequests(arr => [...arr, prediction])

    const fileName = fileNameMappings[prediction];
    setBools(arr => [...arr, boolMappings[fileName]]);
    
    console.log(boolMappings[fileName]);
    
  }

  
const styles = StyleSheet.create({
  instructionsContainer: {
    justifyContent: "flex-start",
    alignContent: "center",
    flexDirection: "column",
    width: 740,
    marginTop: 10,
    marginHorizontal: 5,
},
    instructions:{
        fontSize: 18,
        color: "#000",
        marginLeft: 5,
        fontWeight: "600",
    },
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
    addFeatureButton: {
      backgroundColor: "darkgreen",
      borderRadius: 10,
      alignItems: "center",
      height: 40,
      width: 200
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
    nlpPredictionsContainer:{
      alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf:'stretch',
        paddingLeft: "25%",
    },
      generateDownloadAppContainer: {

        //alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // paddingLeft: "25%",
        paddingBottom: 50
      },
      speechToTextButton: {
        backgroundColor: 'skyblue', // Choose your desired color
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '45%',
      },
      recognizedTextContainer: {
        backgroundColor: '#F2F2F2',
        borderRadius: 8,
        padding: 8,
        marginTop: 16,
      },
    
      recognizedTextStyle: {
        color: '#333333',
        fontSize: 16,
      },
    
});


