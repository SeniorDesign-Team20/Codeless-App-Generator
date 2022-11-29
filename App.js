import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from "react";
import CheckBox from "./CheckBox";
import Firebase from "./firebase";
import Top from './title';
import EnterFeatures from "./inputFeatures";



export default function App() {
    const [feature1, set1] = useState(false);
    const [feature2, set2] = useState(false);
    const [feature3, set3] = useState(false);
    const [feature4, set4] = useState(false);
    const [feature5, set5] = useState(false);

    const [url, seturl] = useState('');

    useEffect(() => {
      Firebase().then((res) => {
        seturl(res);
      })

    }, [])

    

    var [features, setFeatures] = useState([]);
    var confirmHandle = (InputText) =>{
      //connect to twitter and pull the data to detect bot
      //Implement here


      //Alert when input is empt
      if(InputText.length < 1){
        Alert.alert('Please Note',
          'Account Name can not be empty!',
        [{text: 'OK', onPress: () => console.log('alert closed')}])
      }
      //Alert when account does not exis

     
      //implement here
      setUser(InputText); 

       //Display Acount Bot Score, implement score data here.

       Alert.alert(InputText,"His or Her bot score is 0/5",[
        {text:'Nice!',onpress: () => console.log('Check complete')}
       ])
    }

    return (
        <View style={styles.container}>
            <Top style = {styles.titleStyle}/>
            <CheckBox
                onPress={() => set1(!feature1)}
                title="Example Feature 1"
                isChecked={feature1}
              />
              <CheckBox
                onPress={() => set2(!feature2)}
                title="Example Feature 2"
                isChecked={feature2}
              />
              <CheckBox
                onPress={() => set3(!feature3)}
                title="Example Feature 3"
                isChecked={feature3}
              />
              <CheckBox
                onPress={() => set4(!feature4)}
                title="Example Feature 4"
                isChecked={feature4}
              />
              <CheckBox
                onPress={() => set5(!feature5)}
                title="Example Feature 5"
                isChecked={feature5}
              />

              <Text>
                Hello, this is the URL: {url}
              </Text>

            
            <EnterFeatures confirmHandle ={confirmHandle}/>

        </View>
      );
    }

  
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "left",
        top: 0
      },
    titleStyle: {
      flex: 1,
      fontFamily: "Cochin",
      top: 0
    }
});
