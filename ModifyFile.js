import firebase from 'firebase/app';
import 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import axios from 'axios'
import setSelectedFeatures from './SetSelectedFeatures';

const firebaseConfig = {
    apiKey: "${{ secrets.FIREBASEAPIKEY }}",
    authDomain: "codeless-app-generator.firebaseapp.com",
    projectId: "codeless-app-generator",
    storageBucket: "codeless-app-generator.appspot.com",
    messagingSenderId: "${{ secrets.MESSAGINGSENDERID }}",
    appId: "${{ secrets.APPID }}",
    measurementId: "${{ secrets.MEASURMENTID }}"
  };

// Modify the file's boolean variables
// Modify the file's boolean variables
async function modifyFile(fileList) {
    const featureChoices = setSelectedFeatures(fileList)
    const modifyapp = initializeApp(firebaseConfig);

    const storage = getStorage(modifyapp);

    // The name of the JSON file to be modified
    const fileDirectory = 'DefaultSelectFeatures/selectedFeatures.js';  
    const fileName = 'GeneratedApp/selectedFeatures.js'
    
    const defaultFileRef = ref(storage,fileDirectory);
    const updatedFileRef = ref(storage,fileName);
    console.log("got reference");

    const contentpromises = async (fileDirectory) => {
        const url = await getDownloadURL(defaultFileRef);
        console.log("got download URL");
        console.log(url);
    
      //Trying axios - best so far, can fetch without the token in url
    
      return axios.get(url,{
        headers: {
        }
      }).then(response => {
        return response.data
      })
      .catch(error => {
        console.error(error);
      })
      };

    //   let fileContents = await response.text();
    await contentpromises(fileName)
    .then(async fileContent => {
        console.log('original file contents:');
        console.log(fileContent);
        for (const element in featureChoices) {
          //const featureName = element.replace(/\.js$/, "");
          if (featureChoices[element]){
            fileContent = fileContent.replace(`export const include_${element} = false`, `export const include_${element} = ${featureChoices[element]};`);
          }

        }
        console.log('new file contents:');
        console.log(fileContent);
        const encoder = new TextEncoder();
        const fileData = encoder.encode(fileContent);
        await uploadBytes(updatedFileRef, fileData);
        console.log(`Successfully modified ${fileName}`);
    })
    .catch(error => {
        console.error(error);
    });

}

export default modifyFile;
