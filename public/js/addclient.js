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
const clientForm = document.getElementById('client-form');

    clientForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const arrival = document.getElementById('arrival').value;
    const departure = document.getElementById('departure').value;
    const name = document.getElementById('name').value;

    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const roomNumber = document.getElementById('roomNumber').value;
    const username = document.getElementById('username').value;
    let hashedPassword = '';

    async function hashSHA256(input) {
                   const encoder = new TextEncoder();
                   const data = encoder.encode(input);
                   const hashBuffer = await crypto.subtle.digest('SHA-256', data);
                   const hashArray = Array.from(new Uint8Array(hashBuffer));
                   const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
                   return hashHex;
               }
    hashedPassword = await hashSHA256(password);
               // Example usage



    try {


         const clientsRef = collection(db, 'clients');
         await setDoc(doc(db, 'clients', id),{
            arrival: arrival,
            departure: departure,
            name: name,
            password: hashedPassword,
            role: role,
            roomNumber: roomNumber,
            username: username
         })
        .then(() => {
            clientForm.reset()
        })




    } catch (error) {

        console.log('Error adding client: ', error);

    }
});