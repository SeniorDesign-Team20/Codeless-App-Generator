// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKb7hzV6JrrWShNYF6zPxNvDc-jxUEAlU",
  authDomain: "codeless-app-generator.firebaseapp.com",
  projectId: "codeless-app-generator",
  storageBucket: "codeless-app-generator.appspot.com",
  messagingSenderId: "201718739843",
  appId: "1:201718739843:web:1bd87fe22f3c2a8ee9bcb6",
  measurementId: "G-QHSFN77P3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);