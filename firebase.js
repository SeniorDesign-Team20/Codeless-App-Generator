// Import the functions you need from the SDKs you need
import { initializeApp, firebase } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import JSZip from "jszip";
import axios from 'axios'
//import RNFetchBlob from "react-native-fetch-blob";
// import myFetch from 'isomorphic-fetch';
// import ReactNativeBlobUtil from 'react-native-blob-util';
// import RNFetchBlob from 'react-native-fetch-blob';
// import RNFetchBlob from 'rn-fetch-blob';
//import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
      apiKey: "${{ secrets.FIREBASEAPIKEY }}",
      authDomain: "codeless-app-generator.firebaseapp.com",
      projectId: "codeless-app-generator",
      storageBucket: "codeless-app-generator.appspot.com",
      messagingSenderId: "${{ secrets.MESSAGINGSENDERID }}",
      appId: "${{ secrets.APPID }}"
};



const Firebase = async (fileNames) => {

  // Initialize Firebase
  const app2 = initializeApp(firebaseConfig, 'app2');
  // Initialize Cloud Storage and get a reference to the service
  const storage = getStorage(app2);
  // const db = getDatabase(app);

  
  const promises = fileNames.map(async fileName => {
      
      const fileRef = ref(storage,fileName);
      console.log("got reference");

      const url = await getDownloadURL(fileRef);
      console.log("got download URL");
      console.log(url);

      return axios.get(url,{
        headers: {
        }
      }).then(response => {
        return {fileName, response: response.data}
      })
      .catch(error => {
        console.error(error);
      })
    }
  );

  const files = await Promise.all(promises);
  const zip = new JSZip();
  console.log("zipping");
  files.forEach(({ fileName, response }) => {
    zip.file(fileName, response);
    console.log("zipped");
  });

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const zipRef = ref(storage, 'Features.zip/');
  await uploadBytes(zipRef, zipBlob);
  console.log('Uploaded a blob or file!');
  const downloadURL = await getDownloadURL(zipRef);
  //gs://codeless-app-generator.appspot.com/GeneratedApp/README.md
  // Replace selected features file
  // const selFeaturesFileRef = ref(storage, 'selected_features.js/');
  // // uploads file
  // await uploadBytes(selFeaturesFileRef, './selected_features.js');
  // console.log('Finished reset selected features file');

  return downloadURL;

}

export default Firebase;