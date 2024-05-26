// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, onSnapshot, doc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
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

const clientRoomInfoDiv = document.getElementById('client-room-info');
async function getClientAndRoomInfo() {
    const clientsRef = collection(db, 'clients');

    try {
        // Get all clients
        const clientsSnapshot = await getDocs(clientsRef);

        // Iterate over each client
        clientsSnapshot.forEach(async clientDoc => {
            const clientId = clientDoc.id;
            const clientData = clientDoc.data();

            // Retrieve room information for the current client
            if (clientData.roomNumber) {
                const roomRef = collection(db, 'rooms');
                 try {
                    const roomsSnapshot = await getDocs(roomRef);
                    roomsSnapshot.forEach(async roomDoc => {
                            const roomId = roomDoc.id;
                            const roomData = roomDoc.data();

                            // Retrieve room information for the current client
                            if (clientData.roomNumber == roomId) {

                                // Display client and room information
                                  console.log('Client:', clientData.name);
                                  console.log('Arrival:', clientData.arrival);
                                  console.log('Departure:', clientData.departure);
                                  console.log('Room Number:', clientData.roomNumber);
                                  console.log('Lights On:', roomData.lightsOn);
                                  console.log('Window Opened:', roomData.windowOpened);
                                  console.log('Temperature:', roomData.temperature);
                                  console.log('TV Opened:', roomData.tvOpened);
                                  console.log('Door Locked:', roomData.doorLocked);
                                  console.log('Ready to Clean:', roomData.readyToClean);
                                  console.log('-------------------------------------');


                                  const clientInfoHTML = `
                                          <div class="client-info">
                                              <h2>${clientData.name}</h2>
                                              <p>Arrival: ${clientData.arrival}</p>
                                              <p>Departure: ${clientData.departure}</p>
                                          </div>
                                      `;

                                      const roomInfoHTML = `
                                          <div class="room-info">
                                              <h3>Room Information</h3>
                                              <p>Lights On: ${roomData.lightsOn ? 'Yes' : 'No'}</p>
                                              <p>Window Opened: ${roomData.windowOpened ? 'Yes' : 'No'}</p>
                                              <p>Temperature: ${roomData.temperature}°C</p>
                                              <p>TV Opened: ${roomData.tvOpened ? 'Yes' : 'No'}</p>
                                              <p>Door Locked: ${roomData.doorLocked ? 'Yes' : 'No'}</p>
                                              <p>Ready to Clean: ${roomData.readyToClean ? 'Yes' : 'No'}</p>
                                          </div>
                                      `;

                                      clientRoomInfoDiv.innerHTML = clientInfoHTML + roomInfoHTML;
                            }
                        });
                 } catch (error) {
                    console.error('Error fetching rooms:', error);
                 }
        } else {
              console.log('Client ID:', clientId);
              console.log('Client Information:', clientData);
              console.log('Client does not have a room assigned.');
              console.log('-------------------------------------');
        }

       });
    } catch (error) {
        console.error('Error fetching clients:', error);
    }
}

// Call the function to retrieve client and room information for each client
getClientAndRoomInfo();




