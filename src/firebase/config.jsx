// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK9_1y0Sy1AfihU2VoCju-cL2HpEEIRtc",
  authDomain: "note-app-f0256.firebaseapp.com",
  projectId: "note-app-f0256",
  storageBucket: "note-app-f0256.appspot.com",
  messagingSenderId: "1038604027809",
  appId: "1:1038604027809:web:e00a1559a7f30951136de0",
  measurementId: "G-QMKZXT6FF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);