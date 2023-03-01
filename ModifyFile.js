import firebase from 'firebase/app';
import 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import axios from 'axios'

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
async function modifyFile() {

    const modifyapp = initializeApp(firebaseConfig);

    const storage = getStorage(modifyapp);

    // The name of the JSON file to be modified
    const fileName = 'selected_features.js';  
    
    const fileRef = ref(storage,fileName);
    console.log("got reference");

    const contentpromises = async fileName => {
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
    contentpromises(fileName)
    .then(fileContent => {
        console.log('original file contents:');
        console.log(fileContent);
        fileContent = fileContent.replace('export const include_help       = false;', 'export const include_help       = true;');
        console.log('new file contents:');
        console.log(fileContent);
        const encoder = new TextEncoder();
        const fileData = encoder.encode(fileContent);
        uploadBytes(fileRef, fileData);
        console.log(`Successfully modified ${fileName}`);
    })
    .catch(error => {
        console.error(error);
    });

}

export default modifyFile;
