// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import 'firebase/auth';
import { FirebaseAuth } from 'firebaseui-web';

//import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



const Firebase = () => {
      // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "${{ secrets.FIREBASEAPIKEY }}",
    authDomain: "codeless-app-generator.firebaseapp.com",
    projectId: "codeless-app-generator",
    storageBucket: "codeless-app-generator.appspot.com",
    messagingSenderId: "${{ secrets.MESSAGINGSENDERID }}",
    appId: "${{ secrets.APPID }}",
    measurementId: "${{ secrets.MEASURMENTID }}"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Storage and get a reference to the service
  const storage = getStorage(app);
  // const db = getDatabase(app);



  const storageRef = ref(storage);
  const textFileRef = ref(storage, '/firebase_test.txt');

  const url = getDownloadURL(textFileRef);
  

  getDownloadURL(textFileRef)
    .then((url) => {
      // `url` is the download URL for 'images/firebase_test.txt'
      console.log(url);
      const url_return = url;
      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
      const URL = url;
    })
    .catch((error) => {
      // Handle any errors
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          console.log('File doesnt exist');
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          console.log('user doesnt have permission to access object');
          break;
        case 'storage/canceled':
          // User canceled the upload
          console.log('User cancelled the upload');
          break;
        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          console.log('Unkownerror occurred, inspect the server response');
          break;
        default:
          console.log(url);
      }
    });
    return url;
  }

  export default Firebase;
  