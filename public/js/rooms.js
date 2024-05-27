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

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth(app)

const clientRoomInfoDiv = document.getElementById('client-room-info');
async function getClientAndRoomInfo() {
    const clientsRef = collection(db, 'clients');
    let roomInfoHTML='';
    let clientInfoHTML='';
    let clientRoomHTML='';
    let roomsInRow = 0;
    try {
        // Get all clients
        const clientsSnapshot = await getDocs(clientsRef);
         const sortedDocs = clientsSnapshot.docs.sort((a, b) => {
                const idA = parseInt(a.id);
                const idB = parseInt(b.id);
                return idA - idB;
            });

        // Iterate over each client
       sortedDocs.forEach(async clientDoc => {
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
                             let roomLights = roomData.lightsOn !== 0;
                             let roomWindow = roomData.windowOpened !== "closed";
                             let roomTv = roomData.tvOpened !== "closed";
                             let roomDoor = roomData.doorLocked == "locked";

                            // Retrieve room information for the current client
                            if (clientData.roomNumber == roomId) {

                                 if (roomsInRow === 0) {
                                    clientRoomHTML += '<div class="row">';
                                }

                                // Accumulate HTML content for client and room information
                                clientRoomHTML += `
                                    <div class="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.1s">


                                        <div class="room-info">

                                            <h2>Room Number: ${roomData.number}</h2>
                                            <p>Lights On: ${roomLights ? 'Yes' : 'No'}</p>
                                            <p>Window Opened: ${roomWindow ? 'Yes' : 'No'}</p>
                                            <p>Temperature: ${roomData.temperature}°C</p>
                                            <p>TV Opened: ${roomTv ? 'Yes' : 'No'}</p>
                                            <p>Door Locked: ${roomDoor ? 'Yes' : 'No'}</p>

                                            <p>Ready to Clean: ${roomData.readyToClean ? 'Yes' : 'No'}</p>
                                            <div class="client-info">
                                                 <h3>Client Information</h3>
                                                <p>Name: ${clientData.name}</p>
                                                <p>Arrival: ${clientData.arrival}</p>
                                                <p>Departure: ${clientData.departure}</p>
                                            </div>
                                            <button class="edit-room-btn" data-room="${roomId}">Edit Room</button>
                                        </div>
                                    </div>
                                `;

                                // Increment the counter for rooms in the row
                                roomsInRow++;

                                // Check if two rooms have been added to the row
                                if (roomsInRow === 2) {
                                    clientRoomHTML += '</div>'; // Close the row
                                    roomsInRow = 0; // Reset the counter
                                }

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
        clientRoomInfoDiv.innerHTML = clientRoomHTML;
        const editRoomButtons = document.querySelectorAll('.edit-room-btn');
                editRoomButtons.forEach(button => {
                    button.addEventListener('click', async event => {
                        const number = event.target.dataset.room;

                        const roomInfoElement = event.target.closest('.room-info');

                        const roomRef = doc(db, 'rooms', number);
                        const roomSnapshot = await getDoc(roomRef);
                        const roomData = roomSnapshot.data();
                        const roomId = roomSnapshot.id;

                         let roomLights = roomData.lightsOn !== 0;
                         let roomWindow = roomData.windowOpened !== "closed";
                         let roomTv = roomData.tvOpened !== "closed";
                        let roomDoor = roomData.doorLocked == "locked";

                       const form = document.createElement('form');
                               form.classList.add('edit-room-form');

                               form.innerHTML = `
                                           <label for="lightsOn-${roomId}">Lights On:</label>
                                           <input type="checkbox" id="lightsOn-${roomId}" name="lightsOn" ${roomLights ? 'checked' : ''}><br>
                                           <label for="windowOpened-${roomId}">Window Opened:</label>
                                           <input type="checkbox" id="windowOpened-${roomId}" name="windowOpened" ${roomWindow ? 'checked' : ''}><br>
                                           <label for="temperature-${roomId}">Temperature:</label>
                                           <input type="number" id="temperature-${roomId}" name="temperature" value="${roomData.temperature}"><br>
                                           <label for="tvOpened-${roomId}">TV Opened:</label>
                                           <input type="checkbox" id="tvOpened-${roomId}" name="tvOpened" ${roomTv ? 'checked' : ''}><br>
                                           <label for="doorLocked-${roomId}">Door Locked:</label>
                                           <input type="checkbox" id="doorLocked-${roomId}" name="doorLocked" ${roomDoor ? 'checked' : ''}><br>
                                           <label for="readyToClean-${roomId}">Ready to Clean:</label>
                                           <input type="checkbox" id="readyToClean-${roomId}" name="readyToClean" ${roomData.readyToClean ? 'checked' : ''}><br>
                                           <button type="submit">Save</button>
                                           <button type="button" class="cancel-btn">Cancel</button>
                                       `;

                                  const roomInfo = event.target.closest('.room-info');
                                          roomInfo.appendChild(form);


                                        // Handle form submission
                                        form.addEventListener('submit', async (e) => {
                                            e.preventDefault();
                                            const updatedData = {
                                               lightsOn: form.elements['lightsOn'].checked ? 1 : 0,
                                               windowOpened: form.elements['windowOpened'].checked ? "open" : "closed",
                                                temperature: form.elements['temperature'].value,
                                                tvOpened: form.elements['tvOpened'].checked ? "open" : "closed",
                                                doorLocked: form.elements['doorLocked'].checked ? "locked": "unlocked",

                                                readyToClean: form.elements['readyToClean'].checked
                                            };

                                            // Update the room data in Firestore
                                             await updateDoc(roomRef, updatedData);

                                            form.remove();




                        });
                          // Handle form cancellation
                                  form.querySelector('.cancel-btn').addEventListener('click', () => {
                                      // Remove the overlay
                                      form.remove();
                                  });
                    });
                });
       });
       const unsubscribe = onSnapshot(collection(db, 'rooms'), snapshot => {
                   snapshot.docChanges().forEach(change => {
                       if (change.type === "modified") {
                           const roomData = change.doc.data();
                           const roomId = change.doc.id;
                            let roomLights = roomData.lightsOn !== 0;
                            let roomWindow = roomData.windowOpened !== "closed";
                            let roomTv = roomData.tvOpened !== "closed";
                             let roomDoor = roomData.doorLocked == "locked";

                           // Update the room information displayed on the page
                           const roomElements = document.querySelectorAll(`[data-room="${roomId}"]`);
                           roomElements.forEach(element => {
                               const roomInfoElement = element.closest('.room-info');
                               if (roomInfoElement) {
                                   roomInfoElement.querySelector('p:nth-child(2)').textContent = `Lights On: ${roomLights ? 'Yes' : 'No'}`;
                                   roomInfoElement.querySelector('p:nth-child(3)').textContent = `Window Opened: ${roomWindow ? 'Yes' : 'No'}`;
                                   roomInfoElement.querySelector('p:nth-child(4)').textContent = `Temperature: ${roomData.temperature}°C`;
                                   roomInfoElement.querySelector('p:nth-child(5)').textContent = `TV Opened: ${roomTv ? 'Yes' : 'No'}`;
                                   roomInfoElement.querySelector('p:nth-child(6)').textContent = `Door Locked: ${roomDoor ? 'Yes' : 'No'}`;
                                   roomInfoElement.querySelector('p:nth-child(7)').textContent = `Ready to Clean: ${roomData.readyToClean ? 'Yes' : 'No'}`;
                               }
                           });
                       }
                   });
               });

               // Cleanup function to unsubscribe from real-time updates when the component is unmounted or no longer in use
               return unsubscribe;
    } catch (error) {
        console.error('Error fetching clients:', error);
    }

}

// Call the function to retrieve client and room information for each client
getClientAndRoomInfo();



