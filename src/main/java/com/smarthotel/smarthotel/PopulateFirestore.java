package com.smarthotel.smarthotel;


import com.google.cloud.firestore.Firestore;

import java.util.concurrent.ExecutionException;

public class PopulateFirestore {
    public static void main(String[] args) {
        try {
            Firestore db = FirestoreInitializer.initialize();
            UserStore userStore = new UserStore(db);

            // Store clients
            for (int i = 1; i <= 10; i++) {
                String id = "client" + i;
                String name = "Client " + i;
                String username = "client" + i + "@smarthotel.com";
                String password = "password" + i;
                String role = "client";
                String roomNumber = "Room" + i;
                String arrival = "2024-05-019";
                String departure = "2024-05-27";
                userStore.storeClient(id, name, username, password, role, roomNumber, arrival, departure);
            }

            // Store admins
            for (int i = 1; i <= 2; i++) {
                String id = "admin" + i;
                String name = "Admin " + i;
                String username = "admin" + i + "@smarthotel.com";
                String password = "adminpassword" + i;
                String role = "admin";
                userStore.storeAdmin(id, name, username, password, role);
            }

            // Store rooms
            for (int i = 1; i <= 20; i++) {
                String number = "Room" + i;
                boolean lightsOn = false;
                boolean windowOpened = false;
                double temperature = 22.0;
                boolean tvOpened = false;
                boolean doorLocked = true;
                boolean readyToClean = true;
                userStore.storeRoom(number, lightsOn, windowOpened, temperature, tvOpened, doorLocked, readyToClean);
            }

            System.out.println("Data populated successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
