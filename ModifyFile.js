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
    const fileName = 'selected_features.js';  
    
    const fileRef = ref(storage,fileName);
    console.log("got reference");

    const contentpromises = async (fileName) => {
        const url = await getDownloadURL(fileRef);
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
          const featureName = element.replace(/\.js$/, "");
          if (featureChoices[element]){
            fileContent = fileContent.replace(`export const include_${featureName} = false`, `export const include_${featureName} = ${featureChoices[element]};`);
          }
        }
        console.log('new file contents:');
        console.log(fileContent);
        const encoder = new TextEncoder();
        const fileData = encoder.encode(fileContent);
        await uploadBytes(fileRef, fileData);
        console.log(`Successfully modified ${fileName}`);
    })
    .catch(error => {
        console.error(error);
    });

}

export default modifyFile;
