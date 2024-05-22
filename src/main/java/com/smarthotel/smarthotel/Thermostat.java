package com.smarthotel.smarthotel;

public class Thermostat {
    private int temperature;

    public Thermostat() {
        this.temperature = 0;
    }

    public void setTemperature(int temperature) {
        System.out.println("Temperature set to: " + temperature + " degrees.");
        this.temperature = temperature;
    }

    public int getTemperature() {
        return temperature;
    }

    public void increaseTemperature() {
        temperature++;
        System.out.println("Temperature increased to: " + temperature + " degrees.");
    }

    public void decreaseTemperature() {
        temperature--;
        System.out.println("Temperature decreased to: " + temperature + " degrees.");
    }
}

