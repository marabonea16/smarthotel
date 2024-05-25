package com.smarthotel.smarthotel;



import org.mindrot.jbcrypt.BCrypt;

public class PasswordHasher {
    private static final int SALT_ROUNDS = 10;

    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt(SALT_ROUNDS));
    }
}
