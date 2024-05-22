package com.smarthotel.smarthotel;

public class Window {
    private boolean windowOpen;

    public Window() {
        this.windowOpen = false;
    }

    public void openWindow() {
        System.out.println("Window opened.");
        windowOpen = true;
    }

    public void closeWindow() {
        System.out.println("Window closed.");
        windowOpen = false;
    }

    public void partiallyOpenWindow() {
        System.out.println("Window partially opened.");
        // Logic for partially opening window
    }
}
