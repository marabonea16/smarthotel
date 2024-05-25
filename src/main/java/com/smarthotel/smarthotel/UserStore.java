package com.smarthotel.smarthotel;


import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.DocumentReference;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public class UserStore {
    private final Firestore db;

    public UserStore(Firestore db) {
        this.db = db;
    }

    public void storeClient(String id, String name, String username, String password, String role, String roomNumber, String arrival, String departure) throws InterruptedException, ExecutionException {
        String hashedPassword = PasswordHasher.hashPassword(password);
        DocumentReference clientRef = db.collection("clients").document(id);

        Map<String, Object> clientData = new HashMap<>();
        clientData.put("name", name);
        clientData.put("username", username);
        clientData.put("password", hashedPassword);
        clientData.put("role", role);
        clientData.put("roomNumber", roomNumber);
        clientData.put("arrival", arrival);
        clientData.put("departure", departure);

        clientRef.set(clientData).get();
    }

    public void storeAdmin(String id, String name, String username, String password, String role) throws InterruptedException, ExecutionException {
        String hashedPassword = PasswordHasher.hashPassword(password);
        DocumentReference adminRef = db.collection("admins").document(id);

        Map<String, Object> adminData = new HashMap<>();
        adminData.put("name", name);
        adminData.put("username", username);
        adminData.put("password", hashedPassword);
        adminData.put("role", role);

        adminRef.set(adminData).get();
    }

    public void storeRoom(String number, boolean lightsOn, boolean windowOpened, double temperature, boolean tvOpened, boolean doorLocked, boolean readyToClean) throws InterruptedException, ExecutionException {
        DocumentReference roomRef = db.collection("rooms").document(number);

        Map<String, Object> roomData = new HashMap<>();
        roomData.put("lightsOn", lightsOn);
        roomData.put("windowOpened", windowOpened);
        roomData.put("temperature", temperature);
        roomData.put("tvOpened", tvOpened);
        roomData.put("doorLocked", doorLocked);
        roomData.put("readyToClean", readyToClean);

        roomRef.set(roomData).get();
    }
}