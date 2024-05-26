/*// Hardcoded credentials
    const HARDCODED_USERNAME_ADMIN = 'admin1@smarthotel.com';
    const HARDCODED_PASSWORD_ADMIN = 'admin1';

    const HARDCODED_USERNAME_CLIENT = 'client1@smarthotel.com';
    const HARDCODED_PASSWORD_CLIENT = 'client1';

    function checkCredentials() {
        // Get values from the form
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Check if they match the hardcoded credentials
        if (username === HARDCODED_USERNAME_ADMIN && password === HARDCODED_PASSWORD_ADMIN) {

            window.location.href = 'admin.html';
        } else {
            if (username === HARDCODED_USERNAME_CLIENT && password === HARDCODED_PASSWORD_CLIENT) {

                window.location.href = 'home.html?user=client1';
            } else {
                alert('Invalid username or password. Please try again.');
            }
        }
    }
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, onSnapshot, doc, query, where, orderBy, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
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

const app = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth(app)

const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('errorMessage')



loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;
    let hashedPassword = '';


    async function hashSHA256(input) {
               const encoder = new TextEncoder();
               const data = encoder.encode(input);
               const hashBuffer = await crypto.subtle.digest('SHA-256', data);
               const hashArray = Array.from(new Uint8Array(hashBuffer));
               const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
               return hashHex;
           }

           // Example usage
           (async () => {

              hashedPassword = await hashSHA256(password);

           })();


    try {
        // Query Firestore to find a document with matching username
        const clientsSnapshot = await getDocs(collection(db, 'clients'), where('username', '==', username));
        const adminsSnapshot = await getDocs(collection(db, 'admins'), where('username', '==', username));

        if (clientsSnapshot.empty && adminsSnapshot.empty) {
            // Username not found
            loginError.textContent = "Invalid username or password.";
            return;
        }

        // Assuming only one user can have the same username
        const clientDoc = clientsSnapshot.docs[0];
        const clientData = clientDoc.data();

         const adminDoc = adminsSnapshot.docs[0];
         const adminData = adminDoc.data();

 sessionStorage.setItem('username', username);

        if (clientData.password == hashedPassword) {
            // Password matches, sign in successful
            loginError.textContent = "";


           window.location.href = 'home.html';

            // For example: window.location.href = "dashboard.html";
        } else {

           if (adminData.password == hashedPassword) {
                       // Password matches, sign in successful
                       loginError.textContent = "";

                            window.location.href = 'admin.html';

                       // For example: window.location.href = "dashboard.html";
                   } else {
                       // Password doesn't match
                       loginError.textContent = "Invalid username or password.";
                   }
        }
    } catch (error) {
        console.error('Error:', error);
        loginError.textContent = "An error occurred. Please try again later.";
    }
});