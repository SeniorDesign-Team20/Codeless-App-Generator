
// Import the functions you need from the SDKs you need
import { initializeApp, firebase } from "firebase/app";
import { getStorage, ref, refFromURL, getDownloadURL, uploadBytes, listAll } from "firebase/storage";
import JSZip from "jszip";
import axios from 'axios'

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

export default Firebase;