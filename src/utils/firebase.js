// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDKvl5e6mMuPbAFm2A_qSwIo8jiCpIpLQ",
  authDomain: "elearningwebapp-3f80f.firebaseapp.com",
  projectId: "elearningwebapp-3f80f",
  storageBucket: "elearningwebapp-3f80f.appspot.com",
  messagingSenderId: "374195284896",
  appId: "1:374195284896:web:a09a8d3ed38ac0c35392c5",
  measurementId: "G-Q2RPYTFSP1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);