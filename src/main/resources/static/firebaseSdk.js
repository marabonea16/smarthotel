// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAxY5nKchhwrt87Ith95M9RA32ISb1tvM8",
    authDomain: "smarthotel-fis.firebaseapp.com",
    projectId: "smarthotel-fis",
    storageBucket: "smarthotel-fis.appspot.com",
    messagingSenderId: "642095191274",
    appId: "1:642095191274:web:06d666b5e78e3133fb3393",
    measurementId: "G-Q2GE75QTRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);