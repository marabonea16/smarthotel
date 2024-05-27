// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, onSnapshot, doc, query, where, orderBy, addDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth(app)
const roomForm = document.getElementById('room-form');

    roomForm.addEventListener('submit', async (e) => {
    e.preventDefault();
const id = document.getElementById('id').value;
    const doorLocked = document.getElementById('doorLocked').value;
                const lightsOn = Number(document.getElementById('lightsOn').value);
                const number = Number(document.getElementById('number').value);
                const readyToClean = document.getElementById('readyToClean').value === "true";
                const temperature = Number(document.getElementById('temperature').value);
                const tvOpened = document.getElementById('tvOpened').value;
                const windowOpened = document.getElementById('windowOpened').value;





    try {



         await setDoc(doc(db, 'rooms', id),{
           doorLocked: doorLocked,
                           lightsOn: lightsOn,
                           number: number,
                           readyToClean: readyToClean,
                           temperature: temperature,
                           tvOpened: tvOpened,
                           windowOpened: windowOpened
         })
        .then(() => {
            roomForm.reset()
        })




    } catch (error) {

        console.log('Error adding client: ', error);

    }
});