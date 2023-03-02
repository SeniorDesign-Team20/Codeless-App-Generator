// Import the functions you need from the SDKs you need
import { initializeApp, firebase } from "firebase/app";
import { getStorage, ref, refFromURL, getDownloadURL, uploadBytes, listAll } from "firebase/storage";
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

const Firebase = async (folderName, excludedFeatures) => {
  // Initialize Firebase
  const app2 = initializeApp(firebaseConfig, 'app2');
  // Initialize Cloud Storage and get a reference to the service
  const storage = getStorage(app2);

  // get a reference to the folder in Firebase Storage
  const folderRef = ref(storage, folderName);

  // create a new JSZip object to store the downloaded files
  const zip = new JSZip();

  // recursively download files from all sub-folders
  const downloadFiles = async (ref, path) => {
    const folderList = await listAll(ref);
    const promises = folderList.items.map(async (fileRef) => {
      const url = await getDownloadURL(fileRef);
      console.log("got download URL for", fileRef.fullPath);

      // get the file contents as a blob
      const response = await axios.get(url, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/zip',
        },
      });

      // add the file to the zip archive
      zip.file(`${path}${fileRef.name}`, response.data);

      console.log("zipped", fileRef.name);
    });

    await Promise.all(promises);

    // download files from sub-folders
    const subPromises = folderList.prefixes.map(async (subRef) => {
      const currSubRefName = `${subRef.name}`; 
      if (excludedFeatures.includes(subRef.name)) {
        currSubRefName = `${currSubRefName}_b`;
        console.log("Getting blank subfolder", currSubRefName);
        return;
      }
      // if (excludedFeatures.includes(subRef.name)) {
      //   console.log("skipping subfolder", subRef.name);
      //   return;
      // }
      const subPath = `${path}${subRef.name}/`;
      console.log("entering subfolder", subPath);
      await downloadFiles(subRef, subPath);
    });

    await Promise.all(subPromises);
  }

  await downloadFiles(folderRef, `${folderName}/`);

  // generate the zip file as a blob and upload it to Firebase Storage
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const zipRef = ref(storage, `${folderName}.zip`);
  await uploadBytes(zipRef, zipBlob);
  console.log('Uploaded a blob or file!');
  const downloadURL = await getDownloadURL(zipRef);

  return downloadURL;
}


// const Firebase = async (folderName, excludedFeatures) => {
//   // Initialize Firebase
//   const app2 = initializeApp(firebaseConfig, 'app2');
//   // Initialize Cloud Storage and get a reference to the service
//   const storage = getStorage(app2);
  
//   // get a reference to the folder in Firebase Storage
//   const folderRef = ref(storage,folderName);

//   // create a new JSZip object to store the downloaded files
//   const zip = new JSZip();

//   // recursively download files from all sub-folders
//   const downloadFiles = async (ref, path) => {
//     const folderList = await listAll(ref);
//     const promises = folderList.items.map(async (fileRef) => {
//       const url = await getDownloadURL(fileRef);
//       console.log("got download URL for", fileRef.fullPath);
      
//       // get the file contents as a blob
//       const response = await axios.get(url, {
//         responseType: 'blob',
//         headers: {
//           'Content-Type': 'application/zip',
//         },
//       });

//       // add the file to the zip archive
//       zip.file(`${path}${fileRef.name}`, response.data);

//       console.log("zipped", fileRef.name);
//     });

//     await Promise.all(promises);

//     // download files from sub-folders
//     const subPromises = folderList.prefixes.map(async (subRef) => {
//       const subPath = `${path}${subRef.name}/`;
//       console.log("entering subfolder", subPath);
//       await downloadFiles(subRef, subPath);
//     });

//     await Promise.all(subPromises);
//   }

//   await downloadFiles(folderRef, `${folderName}/`);

//   // generate the zip file as a blob and upload it to Firebase Storage
//   const zipBlob = await zip.generateAsync({ type: 'blob' });
//   const zipRef = ref(storage, `${folderName}.zip`);
//   await uploadBytes(zipRef, zipBlob);
//   console.log('Uploaded a blob or file!');
//   const downloadURL = await getDownloadURL(zipRef);
  
//   return downloadURL;
// }

export default Firebase;
// const Firebase = async (folderName) => {
//   // Initialize Firebase
//   const app2 = initializeApp(firebaseConfig, 'app2');
//   // Initialize Cloud Storage and get a reference to the service
//   const storage = getStorage(app2);
  
//   //folderName = 'GeneratedApp'
//   // get a reference to the folder in Firebase Storage
//   const folderRef = ref(storage,folderName);

//   // create a new JSZip object to store the downloaded files
//   const zip = new JSZip();

//   // get a list of all the files in the folder and download each one
//   const folderList = await listAll(folderRef);
//   const promises = folderList.items.map(async (fileRef) => {
//     const url = await getDownloadURL(fileRef);
//     console.log("got download URL for", fileRef.name);
    
//     // get the file contents as a blob
//     const response = await axios.get(url, {
//       responseType: 'blob',
//       headers: {
//         'Content-Type': 'application/zip',
//       },
//     });

//     // add the file to the zip archive
//     zip.file(`${folderName}/${fileRef.name}`, response.data);

//     console.log("zipped", fileRef.name);
//   });

//   await Promise.all(promises);

//   // generate the zip file as a blob and upload it to Firebase Storage
//   const zipBlob = await zip.generateAsync({ type: 'blob' });
//   const zipRef = ref(storage, `${folderName}.zip`);
//   await uploadBytes(zipRef, zipBlob);
//   console.log('Uploaded a blob or file!');
//   const downloadURL = await getDownloadURL(zipRef);
  
//   return downloadURL;
// }

// const Firebase = async (fileNames) => {

//   // Initialize Firebase
//   const app2 = initializeApp(firebaseConfig, 'app2');
//   // Initialize Cloud Storage and get a reference to the service
//   const storage = getStorage(app2);
//   // const db = getDatabase(app);

  
//   const promises = fileNames.map(async fileName => {
      
//       const fileRef = ref(storage,fileName);
//       console.log("got reference");

//       const url = await getDownloadURL(fileRef);
//       console.log("got download URL");
//       console.log(url);

//       return axios.get(url,{
//         headers: {
//         }
//       }).then(response => {
//         return {fileName, response: response.data}
//       })
//       .catch(error => {
//         console.error(error);
//       })
//     }
//   );

//   const files = await Promise.all(promises);
//   const zip = new JSZip();
//   console.log("zipping");
//   files.forEach(({ fileName, response }) => {
//     zip.file(fileName, response);
//     console.log("zipped");
//   });

//   const zipBlob = await zip.generateAsync({ type: 'blob' });
//   const zipRef = ref(storage, 'Features.zip/');
//   await uploadBytes(zipRef, zipBlob);
//   console.log('Uploaded a blob or file!');
//   const downloadURL = await getDownloadURL(zipRef);
//   //gs://codeless-app-generator.appspot.com/GeneratedApp/README.md
//   // Replace selected features file
//   // const selFeaturesFileRef = ref(storage, 'selected_features.js/');
//   // // uploads file
//   // await uploadBytes(selFeaturesFileRef, './selected_features.js');
//   // console.log('Finished reset selected features file');

//   return downloadURL;

// }

