import { StyleSheet, View, Alert, FlatList, Button, Text, TextInput, TouchableOpacity, Linking, Image } from "react-native";
import { useState, useEffect } from "react";
import Checkbox from "./CheckBox";
import Firebase from "./data";
import modifyFile from "./ModifyFile"
import {processText, makePrediction} from "./NLP";
import Lottie from 'lottie-react';
import { Speech, isAvailableAsync } from 'expo-speech';
import Voice from '@react-native-community/voice';
import * as Permissions from 'expo-permissions';
import SpeechToTextWeb from './SpeechToTextWeb';
import generateIdFile from "./GenerateIdFile";
//import 'assets'
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
      "Store Hours": "Hours",
      "Weather": "Weather",
    };

    const nlpFeatures = ["About Page", "Activity Feed", "Application Page", "Calculator", "Calendar", "Chatbot",
                         "Contact Form", "Discussion Forum", "FAQ Page", "File Upload", "Google Sign-in", "Job Openings", 
                         "Map", "Menu", "Online Store", "People Page", "Photobooth", "Privacy Policy", "QR Code Scanner", 
                         "Reviews", "Store Hours", "Weather"];

    const boolMappings = {
      "About": "about",
      "Activity": "activityFeed",
      "Apply": "apply",
      "Calculator": "calculator",
      "Calendar": "calendar",
      "Chat": "chat",
      "Chatbot": "chatbot",
      "Contact": "contact",
      "FAQs": "faq",
      "File_Upload": "fileUpload",
      "Careers": "careers",
      "Google_Login": "googleLogin",
      "Hours": "hours",
      "Map": "map",
      "Menu": "menu",
      "Shopping": "products",
      "People": "people",
      "Photo_Booth": "photoBooth",
      "Privacy": "privacy",
      "QR": "qr",
      "Reviews": "reviews",
      "Weather": "weather",
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
    const [status, setStatus] = useState("");
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
      seturl('')
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
      temp2[index] = featureToSwap;
      
      const tempBools = [...selectedBools];
      const fileName = fileNameMappings[featureToSwap];

      tempBools[index] = boolMappings[fileName];

      setTranslatedRequests([...temp2]);
      setBools([...tempBools]);
      seturl('')

    }

    const removeFeature = () => {

    }

    const clearAll = () => {
        setNextBest([])
        setFeatures([])
        setFiles([])
        setBools([])
        setTranslatedRequests([])
        seturl('')
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
      setStatus("Processing your requests . . .");
      console.log(translatedRequests);
      // const bools = translatedRequests.map(feature => {
      //   const fileName = fileNameMappings[feature];
      //   return boolMappings[fileName];
      // });
      
      //setBools(arr => [...arr, bools]);
      console.log(selectedBools);
      await generateRequestFromFiles(seturl, selectedBools, setStatus);      //setIsGenerating(false); // set loading back to false
      setIsLoading(false);
    };

    const predict = async (input) => {
      console.log("getting prediction");
        // Code to be executed asynchronously after 3 seconds
      await getPrediction(setTranslatedRequests, input, fileNameMappings, boolMappings, setBools, setNextBest);
      console.log("got prediction");
    }

    const removeItemAtIndex = (index) => {
      setNextBest(arr => [...arr.slice(0, index), ...arr.slice(index + 1)]);
      setFeatures(arr => [...arr.slice(0, index), ...arr.slice(index + 1)]);
      setTranslatedRequests(arr => [...arr.slice(0, index), ...arr.slice(index + 1)]);
      setBools(arr => [...arr.slice(0, index), ...arr.slice(index + 1)]);
      seturl('')
    }

    const dissappearButton = () => {

    }

    const [showInstructions, setShowInstructions] = useState(false)
    const [showAvailableFeatures, setShowAvailableFeatures] = useState(false)
    const [showDownload, setShowDownload] = useState(false)

    return (
        <View style={styles.container}>
           <View style={styles.left}>
                <View style={styles.featureInputContainer}>
                    <Text style ={styles.header}>Enter Features: </Text>
                    <Text style = {styles.recognizedTextStyle}>Speach to Text:</Text>
                    <SpeechToTextWeb onTranscriptChange={handleTranscriptChange} />
                    <Text style = {styles.transcript}>Transcript: {transcript} </Text>

                    <Text style = {styles.regularTextStyle}>Regular: </Text>
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
                </View>
                <View style={styles.instructionsContainer}>
                  {showInstructions ? 
                  (
                    <TouchableOpacity onPress={() => setShowInstructions(!showInstructions)}>                  
                      <Text style={styles.header}>Instructions {'('}Press to Toggle{')'}</Text>
                      <Text style={styles.instructions}> 1. Enter Features: </Text>
                      <Text style={styles.description}>&#8226; Input the features you would like to include in your app one by one.</Text>
                      <Text style={styles.description}>&#8226; You can either type the feature in the text input box or use the Speech-to-Text functionality to speak the desired features. {'\n'}</Text>
                      <Text style={styles.instructions}> 2. Add/Remove Predictions: </Text>
                      <Text style={styles.description}>&#8226; Use the <Text style={styles.greenFeatureMini}> Add Feature </Text> button or the enter key to confirm the features you’ve entered. Your input will then pop up on under <Text style={{fontWeight:'bold', textDecorationLine: 'underline'}}>Your Inputs</Text> while our app’s prediction of your desired feature will appear under <Text style={{fontWeight:'bold', textDecorationLine: 'underline'}}>Predictions</Text>.</Text>
                      <Text style={styles.description}>&#8226; Our app will also give 2nd and 3rd guesses of your feature that you can switch out with the top prediction in the event that either of them are the real feature you desired.</Text>
                      <Text style={styles.description}>&#8226; In the event that all three predictions are incorrect, you can click the <Text style={styles.orangeFeatureMini}> Remove </Text> button next to the feature and try again with a modified prompt.</Text>
                      <Text style={styles.description}>&#8226; You may also always start from fresh by clicking the <Text style={styles.orangeFeatureMini}> Restart </Text> button, which will clear out your previous inputs. {'\n'}</Text>
                      <Text style={styles.instructions}> 3. Generate and Download App </Text>
                      <Text style={styles.description}>&#8226; Click the <Text style={styles.greenFeatureMini}> Generate App </Text> button to generate the app</Text>
                      <Text style={styles.description}>&#8226; Click the <Text style={styles.blueFeatureMini}> Download App </Text> button (which only appears after the app generation is done) to download your app as a .zip file.</Text>
                      <Text style={styles.description}>&#8226; Once the app is ready, you will have all of the necessary code in your downloads folder.{'\n'}</Text>
                      <Text style={styles.instructions}> 4. Run App </Text>
                      <Text style={styles.description}>&#8226; To run locally, open the zip, click on the file <Text style={{fontStyle:'italic'}}>start-app-windows.bat</Text> (for windows) or <Text style={{fontStyle:'italic'}}>start-app-mac.sh</Text> (for Mac), and then press the <Text style={{fontStyle:'italic'}}>"w"</Text> key when prompted.</Text>
                      <Text style={styles.description}>&#8226; To host online, upload the downloaded code to a web service provider.</Text>                 
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setShowInstructions(!showInstructions)}>                  
                        <Text style={styles.header}>Instructions {'('}Press to Toggle{')'}</Text>
                    </TouchableOpacity>
                  )} 
                </View>
                <View style={styles.instructionsContainer}>
                  {!showAvailableFeatures ? (
                    <TouchableOpacity onPress={() => setShowAvailableFeatures(!showAvailableFeatures)}>
                      <Text style={styles.header}>Available Features {'('}Press to Toggle{')'}</Text>
                    </TouchableOpacity>
                  )
                  :(
                    <TouchableOpacity onPress={() => setShowAvailableFeatures(!showAvailableFeatures)}>
                      <Text style={styles.header}>Available Features {'('}Press to Toggle{')'}</Text>
                      <Image
                        style={{marginLeft:45, resizeMode:'center', height:500, width:650}}
                        source={require('./assets/available_features.png')}
                      />
                    </TouchableOpacity>
                  )
                  }
                </View>
                
            </View>
            <View style={styles.middle}>       
              <View style={styles.textInputs}>
                <Text style={styles.inputs}>Your Inputs</Text>
                <FlatList
                        data = {selectedFeatures}
                        renderItem={({ item }) => (
                          <View style={styles.bullet}>
                            <Text style={
                              { fontSize: 18,
                                color: "#000",
                                marginLeft: 15,
                                fontWeight: "600",
                                marginBottom: 10,
                                marginTop: 0,
                              } 
                          }>{1 + selectedFeatures.indexOf(item)}) {item}</Text>
                          </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    /> 
              </View>
            </View>
            <View style={styles.predictions}>
              <Text style={styles.pred}>Predictions</Text>
                {isLoading ? (
                <View style={{alignSelf:'center', justifyContent:'center'}}>
                    <Lottie
                      animationData={require('./assets/98432-loading.json')}
                      autoPlay
                      loop
                      //style={{width: '75%', height: '75%'}}
                    />
                    <Text style={[{textAlign:'center'}, styles.Text]}>
                      {status}
                    </Text>
                </View>
                  ):(
                <View style={styles.nlpPredictionsContainer}>      
                  <FlatList
                    data={nextBest}
                    renderItem={({ item, index }) => (
                      <View style={styles.mainBullet}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: "#000",
                            marginLeft: 15,
                            fontWeight: "600",
                          }}
                        >
                          {(index+1).toString()}) {item.prediction} {"  "}
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


                    <View style={styles.generateAppButtonContainer}>
                      <TouchableOpacity 
                          style = {styles.confirmButton} 
                          onPress={() => generateApp()}
                      >
                        <Text style = {styles.textStyle}> GENERATE APP </Text>
                      </TouchableOpacity>
                    </View>
                    
                      <View style = {styles.generateAppButtonContainer}>
                        {url ? (
                            <TouchableOpacity 
                                style = {styles.generateButton} 
                                onPress={() => Linking.openURL(url)}
                            >
                              <Text style = {styles.textStyle}> DOWNLOAD APP </Text>
                            </TouchableOpacity>
                          ) : (
                            <></>
                          )}
                      </View>  
                </View>
                  )}
            </View>
            
        </View>
        
        
      );
    }
  
    async function generateRequestFromFiles(seturl, selectedBools, setStatus) {
      console.log('editing file...');
      await generateIdFile(setStatus)
      await modifyFile(selectedBools, setStatus);
      await Firebase('GeneratedApp', [], setStatus).then((res) => {
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
  generateAppButtonContainer:{
    paddingLeft:50,
    paddingRight:50,
    paddingBottom:10
  },
  left:{
    flexDirection:"column",
    alignContent:"center",
    marginBottom: 10,
    width:"50%",
  },
  middle:{
    flexDirection:"column",
    alignContent:"center",
    marginRight:5,
    width:"20%"
  },
  instructionsContainer: {
    justifyContent: "flex-start",
    alignContent: "center",
    flexDirection: "column",
    //width: 685,
    marginTop: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: `#fff5ee`,
    //width: '100%'
  },
    header:{
        fontSize: 18,
        color: "#000",
        marginLeft: 10,
        fontWeight: "600",
        textDecorationLine: 'underline',
        marginBottom: 5,
        marginTop: 5,
    },
    instructions:{
        fontSize: 18,
        color: "#000",
        marginLeft: 5,
        fontWeight: "600",
        marginTop: 5,
    },
    description:{
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 5,
        marginTop: 5,
    },
    bullet: {
        paddingTop: 10
    },
    mainBullet:{
        paddingTop: 0,
        marginBottom: 20
    },
    confirmButton: {
        backgroundColor: "darkgreen",
        borderRadius: 10,
        alignItems: "center",
        justifyContent:"center",
        paddingLeft:25,
        paddingRight:25,
        //marginLeft:85,
        //marginBottom:25,
        //width:500,
        //height: 40
    },
    removeFeatureButton: {
      backgroundColor: "coral",
      borderRadius: 10,
      marginBottom: 10,
      alignItems: "center",
      height: 40
    },
    addFeatureButton: {
      backgroundColor: "darkgreen",
      borderRadius: 10,
      marginBottom: 10,
      alignItems: "center",
      height: 40,
      width: 200
    },
    generateButton: {
      backgroundColor: "steelblue",
      // borderRadius: 10,
      // alignItems: "center",
      // height: 40,
      // marginTop: 11,
      borderRadius: 10,
      alignItems: "center",
      //height: 40
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
      justifyContent: 'flex-end',
      //bottom: "3%",
      width: 325,
      height: 40,
    },
    container: {
        //flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        
      },
      titleContainer: {
        flexDirection: "row",
        alignSelf: "baseline",
        width: "100%"
      },
      contentContainer: {
        //flex: 1,
        flexDirection: "row"
      },
    featureInputContainer: {
      borderWidth: 1,
      marginHorizontal: 5,
      marginTop: 10,
      borderRadius: 20,
      marginBottom:0,
      //width: '100%',
      backgroundColor: `#fff5ee`
    },
    chooseFeaturesContainer: {
      
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
      fontSize:'50',
      paddingLeft: 15,
      marginBottom: 10,
      marginTop:10,
      marginLeft:25,
      marginRight:25,
      borderWidth:2,
      borderRadius:5
      // borderBottomWidth: 1,
      // borderBottomColor: 'black',
    },

    nlpPredictionsContainer:{
      flex:1,
      justifyContent:'space-between'
    },
      generateDownloadAppContainer: {

        
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
        fontSize: 18,
        marginLeft:20,
        marginBottom: 10,
        marginTop: 10,
        textDecorationLine: 'underline',
      },
      regularTextStyle: {
        color: '#333333',
        fontSize: 18,
        marginLeft:20,
        marginBottom: 10,
        marginTop: 30,
        textDecorationLine: 'underline',
      },
      transcript: {
        marginLeft:25,
        marginTop:2,
        marginBotton: 30,
        fontWeight: 'bold'
      },
    predictions: {
      width:'29%',
      //alignItems:'flex-start', 
      borderWidth:1, 
      borderRadius:20, 
      //marginLeft:5,
      marginTop:10,
      backgroundColor: `#fff5ee`,
      minHeight:680,
    },
    textInputs: {
      //width:'25%', 
      borderWidth:1, 
      borderRadius:20, 
      marginLeft:5,
      marginRight:5,
      marginTop:10,
      backgroundColor: `#fff5ee`,
      minHeight: 680
    },
    inputs: {
      fontSize: 18,
      color: "#000",
      marginLeft: 10,
      fontWeight: "600",
      textDecorationLine: 'underline',
      marginBottom: 5,
      marginTop: 5,
    },
    pred: {
      fontSize: 18,
      color: "#000",
      marginLeft: 10,
      fontWeight: "600",
      textDecorationLine: 'underline',
      marginBottom: 15,
      marginTop: 5,
    },
    orangeFeatureMini: {
      backgroundColor: "coral",
      borderWidth:1,
      borderRadius: 5,
      fontWeight:'bold',
      color: 'white',
      fontSize: 12,
    },
    greenFeatureMini: {
      backgroundColor: "darkgreen",
      borderWidth:1,
      borderRadius: 5,
      fontWeight:'bold',
      color: 'white',
      fontSize: 12,
    },
    blueFeatureMini: {
      backgroundColor: "steelblue",
      borderWidth:1,
      borderRadius: 5,
      fontWeight:'bold',
      color: 'white',
      fontSize: 12,
    },
});


