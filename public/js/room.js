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
async function getClientAndRoomInfo() {
   const username = sessionStorage.getItem('username');

    const clientsRef = collection(db, 'clients');
    const qClients = query(clientsRef, where('username', '==', username));
    const clientsSnapshot = await getDocs(qClients);
    const clientDoc = clientsSnapshot.docs[0];
    const clientData = clientDoc.data();
    const clientId = clientDoc.id;
    const clientRoom = clientData.roomNumber;

    const roomRef = doc(db, 'rooms', clientRoom);
    const unsubscribe = onSnapshot(roomRef, (roomSnapshot) => {

        const roomData = roomSnapshot.data();
        const roomId = roomSnapshot.id;
        const roomNumber = roomData.number;








// Lights Control

        let roomLights = roomData.lightsOn;

        const lightDimButton = document.getElementById("lightDimButton");
        const lightBrightenButton = document.getElementById("lightBrightenButton");
        const lightTurnOffButton = document.getElementById("lightTurnOffButton");
        const lightBulb = document.getElementById("lightBulb");



        lightDimButton.addEventListener("click", () => {
            if (roomLights > 0.2) roomLights -= 0.2;
            updateLightBulb();
        });

        lightBrightenButton.addEventListener("click", () => {
            if (roomLights < 1) roomLights += 0.2;
            updateLightBulb();
        });

        lightTurnOffButton.addEventListener("click", () => {
            roomLights = 0;
            updateLightBulb();
        });

        async function updateLightBulb() {
            lightBulb.style.opacity = roomLights;

            await updateDoc(roomRef, {
               lightsOn: roomLights
            });
        }

        updateLightBulb();

        // Windows Control

        let roomWindow = roomData.windowOpened;


        const windowOpenButton = document.getElementById("windowOpenButton");
        const windowPartialButton = document.getElementById("windowPartialButton");
        const windowCloseButton = document.getElementById("windowCloseButton");
        const windowDisplay = document.getElementById("windowDisplay");

        const windowStates = {
            closed: "closed",
            partial: "partial",
            open: "open"
        };

        async function fetchInitialRoomState() {
           return roomWindow
        }

        function updateWindowDisplay(windowState) {

            windowDisplay.classList.remove("closed", "partial", "open");

            windowDisplay.classList.add(windowState);
        }

        fetchInitialRoomState()
            .then(roomWindow => {

                    updateWindowDisplay(roomWindow);
               });


        windowOpenButton.addEventListener("click", () => updateWindowState(windowStates.open));
        windowPartialButton.addEventListener("click", () => updateWindowState(windowStates.partial));
        windowCloseButton.addEventListener("click", () => updateWindowState(windowStates.closed));

        async function updateWindowState(state) {
            windowDisplay.classList.remove(windowStates.closed, windowStates.partial, windowStates.open);
             windowDisplay.classList.add(state);
            roomWindow = state;
            await updateDoc(roomRef, {
                        windowOpened: roomWindow // Store the window state in Firestore
                    });
        }



        // Temperature Control
        const temperatureIncreaseButton = document.getElementById("temperatureIncreaseButton");
        const temperatureDecreaseButton = document.getElementById("temperatureDecreaseButton");
        const temperatureDisplay = document.getElementById("temperatureDisplay");

        let roomTemperature = roomData.temperature;

        temperatureIncreaseButton.addEventListener("click", () => updateTemperature(1));
        temperatureDecreaseButton.addEventListener("click", () => updateTemperature(-1));

       async function updateTemperature(delta) {
            roomTemperature += delta;

            temperatureDisplay.textContent = `${roomTemperature}°C`;
            await updateDoc(roomRef, {
                temperature: roomTemperature // Store the window state in Firestore
            });
        }

        // Initial display of temperature
        updateTemperature(0); // To display the initial temperature (20°C)

    //tv control


    const tvOpenButton = document.getElementById("tvOpenButton");
    const tvCloseButton = document.getElementById("tvCloseButton");
    const tvDisplay = document.getElementById("tvDisplay");

   let roomTv = roomData.tvOpened;

      const tvStates = {
               closed: "closed",

               open: "open"
           };

    tvOpenButton.addEventListener("click", () => {

        updateTVState("open");
    });

    tvCloseButton.addEventListener("click", () => {

        updateTVState("closed");
    });


    async function fetchInitialTvState() {
               return roomTv
            }

            function updateTvDisplay(tvState) {

                tvDisplay.classList.remove(tvStates.closed, tvStates.open);
                tvDisplay.classList.add(tvState);
            }

            fetchInitialTvState()
                .then(roomTv => {

                        updateTvDisplay(roomTv);
                   });

    async function updateTVState(newState) {
            tvDisplay.classList.remove(tvStates.closed, tvStates.open);
            windowDisplay.classList.add(newState);
            roomTv = newState;
            tvDisplay.textContent = ``;
            await updateDoc(roomRef, {
                tvOpened: roomTv // Store the window state in Firestore
            });
        }
//door control
        let roomDoor = roomData.doorLocked;
        const doorLockedButton = document.getElementById("doorLockedButton");
        const doorUnlockedButton = document.getElementById("doorUnlockedButton");
        const doorDisplay = document.getElementById("doorDisplay");



              const doorStates = {
                       unlocked: "unlocked",

                       locked: "locked"
                   };

            doorLockedButton.addEventListener("click", () => {

                updateDoorState("locked");
            });

            doorUnlockedButton.addEventListener("click", () => {

                updateDoorState("unlocked");
            });


            async function fetchInitialDoorState() {
                       return roomDoor
                    }

                    function updateDoorDisplay(doorState) {

                        doorDisplay.classList.remove(doorStates.unlocked, doorStates.locked);
                        doorDisplay.classList.add(doorState);
                    }

                    fetchInitialDoorState()
                        .then(roomDoor => {

                                updateDoorDisplay(roomDoor);
                           });

            async function updateDoorState(newState) {
                    doorDisplay.classList.remove(doorStates.unlocked, doorStates.locked);
                    doorDisplay.classList.add(newState);
                    roomDoor = newState;
                    doorDisplay.textContent = ``;
                    await updateDoc(roomRef, {
                        doorLocked: roomDoor// Store the window state in Firestore
                    });
                }

     //clean control
             let roomClean = roomData.readyToClean;
             const cleanOpenButton = document.getElementById("cleanOpenButton");
             const cleanCloseButton = document.getElementById("cleanCloseButton");
             const cleanDisplay = document.getElementById("cleanDisplay");



                   const cleanStates = {
                            open: true,

                            close: false
                        };

                 cleanCloseButton.addEventListener("click", () => {

                     updateCleanState(false);
                 });

                 cleanOpenButton.addEventListener("click", () => {

                     updateCleanState(true);
                 });


                 async function fetchInitialCleanState() {
                            return roomClean
                         }

                         function updateCleanDisplay(cleanState) {

                             cleanDisplay.classList.remove(cleanStates.close, cleanStates.open);
                             cleanDisplay.classList.add(cleanState);
                         }

                         fetchInitialCleanState()
                             .then(roomClean => {

                                     updateCleanDisplay(roomClean);
                                });

                 async function updateCleanState(newState) {
                          cleanDisplay.classList.remove(cleanStates.close, cleanStates.open);
                         cleanDisplay.classList.add(newState);
                         roomClean = newState;
                         cleanDisplay.textContent = ``;
                         await updateDoc(roomRef, {
                             readyToClean: roomClean// Store the window state in Firestore
                         });
                     }

});


}
getClientAndRoomInfo();