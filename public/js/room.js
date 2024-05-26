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

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth(app)

   const username = sessionStorage.getItem('username');

    const clientSnapshot = await getDocs(collection(db, 'clients'), where('username', '==', username));
    const clientDoc = clientSnapshot.docs[0];
    const clientId = clientDoc.id;
    const clientData = clientDoc.data();
    const clientRoom = clientData.roomNumber;
    const roomSnapshot = await getDocs(collection(db, 'rooms'), where ('id', '==', clientRoom));
    const roomDoc = roomSnapshot.docs[0];
    const roomId = roomDoc.id;
    const roomData = roomDoc.data();
    const roomNumber = roomData.number;
    const roomLights = roomData.lightsOn;
    const roomWindow = roomData.windowOpened;
    const roomTemperature = roomData.temperature;
    const roomTv = roomData.tvOpened
    const roomDoor = roomData.doorLocked;
    const roomClean = roomData.readyToClean;
    console.log(roomNumber);


// Lights Control
const lightDimButton = document.getElementById("lightDimButton");
const lightBrightenButton = document.getElementById("lightBrightenButton");
const lightTurnOffButton = document.getElementById("lightTurnOffButton");
const lightBulb = document.getElementById("lightBulb");

let lightOpacity = 1;

lightDimButton.addEventListener("click", () => {
    if (lightOpacity > 0.2) lightOpacity -= 0.2;
    updateLightBulb();
});

lightBrightenButton.addEventListener("click", () => {
    if (lightOpacity < 1) lightOpacity += 0.2;
    updateLightBulb();
});

lightTurnOffButton.addEventListener("click", () => {
    lightOpacity = 0;
    updateLightBulb();
});

function updateLightBulb() {
    lightBulb.style.opacity = lightOpacity;
}

// Windows Control
const windowOpenButton = document.getElementById("windowOpenButton");
const windowPartialButton = document.getElementById("windowPartialButton");
const windowCloseButton = document.getElementById("windowCloseButton");
const windowDisplay = document.getElementById("windowDisplay");

const windowStates = {
    closed: "closed",
    partial: "partial",
    open: "open"
};

let currentState = windowStates.closed;

windowOpenButton.addEventListener("click", () => updateWindowState(windowStates.open));
windowPartialButton.addEventListener("click", () => updateWindowState(windowStates.partial));
windowCloseButton.addEventListener("click", () => updateWindowState(windowStates.closed));

function updateWindowState(state) {
    windowDisplay.classList.remove(windowStates.closed, windowStates.partial, windowStates.open);
    windowDisplay.classList.add(state);
    currentState = state;
}

updateWindowState(currentState);

// Temperature Control
const temperatureIncreaseButton = document.getElementById("temperatureIncreaseButton");
const temperatureDecreaseButton = document.getElementById("temperatureDecreaseButton");
const temperatureDisplay = document.getElementById("temperatureDisplay");

let currentTemperature = 20; // Initial temperature

temperatureIncreaseButton.addEventListener("click", () => updateTemperature(1));
temperatureDecreaseButton.addEventListener("click", () => updateTemperature(-1));

function updateTemperature(delta) {
    currentTemperature += delta;
    temperatureDisplay.textContent = `${currentTemperature}°C`;
}

// Initial display of temperature
updateTemperature(0); // To display the initial temperature (20°C)
})(jQuery);*/