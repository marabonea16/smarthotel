package com.smarthotel.smarthotel;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class LoginController {

    private final Firestore db;

    @Autowired
    public LoginController(Firestore db) {
        this.db = db;
    }

    @PostMapping("/login")
    @ResponseBody
    public Response login(@RequestBody LoginRequest loginRequest) {
        try {
            String username = loginRequest.getUsername();
            String password = loginRequest.getPassword();

            // Check clients collection
            List<QueryDocumentSnapshot> clientDocs = db.collection("clients")
                    .whereEqualTo("username", username)
                    .whereEqualTo("password", password)
                    .get()
                    .get()
                    .getDocuments();

            if (!clientDocs.isEmpty()) {
                // Valid client credentials
                return new Response(true, "client");
            }

            // Check admins collection
            List<QueryDocumentSnapshot> adminDocs = db.collection("admins")
                    .whereEqualTo("username", username)
                    .whereEqualTo("password", password)
                    .get()
                    .get()
                    .getDocuments();

            if (!adminDocs.isEmpty()) {
                // Valid admin credentials
                return new Response(true, "admin");
            }

            // Invalid credentials
            return new Response(false, null);

        } catch (Exception e) {
            e.printStackTrace();
            return new Response(false, null);
        }
    }

    static class Response {
        private boolean success;
        private String role;

        public Response(boolean success, String role) {
            this.success = success;
            this.role = role;
        }

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }
}