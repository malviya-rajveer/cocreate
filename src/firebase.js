// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL47KFrLY-esTuSX1HEKnPUWFBST1cZP8",
  authDomain: "cocreate-4a7c9.firebaseapp.com",
  projectId: "cocreate-4a7c9",
  storageBucket: "cocreate-4a7c9.firebasestorage.app",
  messagingSenderId: "508017109033",
  appId: "1:508017109033:web:266fb7533ffac8eba99438",
  measurementId: "G-PCY5H8J2SB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export auth n firebase
export const auth = getAuth(app);
export const db = getFirestore(app);