package com.smarthotel.smarthotel;

public class Door {
    private boolean isLocked;

    public Door() {
        isLocked = false; // Initial state is unlocked
    }

    public void lock() {
        isLocked = true; // Lock the door
        // Code to physically lock the door
    }

    public void unlock() {
        isLocked = false; // Unlock the door
        // Code to physically unlock the door
    }
}

