package com.smarthotel.smarthotel;

public class Lights {
    private int brightnessLevel;

    private boolean lightsOn;

    public Lights() {
        this.lightsOn = false;
    }

    public void turnLightsOn() {
        System.out.println("Lights turned on.");
        lightsOn = true;
    }

    public void turnLightsOff() {
        System.out.println("Lights turned off.");
        lightsOn = false;
    }

    public void dimLights(int intensity) {
        System.out.println("Lights dimmed to intensity: " + intensity);
        // Logic for dimming lights
    }
}
