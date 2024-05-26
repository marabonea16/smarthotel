package com.smarthotel.smarthotel;


import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;

import java.io.FileInputStream;
import java.io.IOException;

public class FirestoreInitializer {
    public static Firestore initialize() throws IOException {
        FileInputStream serviceAccount = new FileInputStream("src/main/resources/serviceAccountKey.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        FirebaseApp.initializeApp(options);

        return FirestoreClient.getFirestore();
    }
}
