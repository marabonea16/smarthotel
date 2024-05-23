import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAxY5nKchhwrt87Ith95M9RA32ISb1tvM8",
  authDomain: "smarthotel-fis.firebaseapp.com",
  databaseURL: "https://smarthotel-fis-default-rtdb.firebaseio.com",
  projectId: "smarthotel-fis",
  storageBucket: "smarthotel-fis.appspot.com",
  messagingSenderId: "642095191274",
  appId: "1:642095191274:web:06d666b5e78e3133fb3393",
  measurementId: "G-Q2GE75QTRH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);