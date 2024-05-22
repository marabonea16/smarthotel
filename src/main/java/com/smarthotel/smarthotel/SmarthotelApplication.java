package com.smarthotel.smarthotel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

@SpringBootApplication
public class SmarthotelApplication {


	public static void main(String[] args) {
		// Initialize Firebase
		FirebaseInitializer.initialize();

		ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");

		// Expose Java objects to JavaScript
		engine.put("lightControl", new Lights());
		engine.put("windowControl", new Window());
		engine.put("temperatureControl", new Thermostat());

		// Execute JavaScript code
		String script = "lightControl.turnLightsOn();\n" +
				"windowControl.openWindow();\n" +
				"temperatureControl.setTemperature(72);";

        try {
            engine.eval(script);
        } catch (ScriptException e) {
            throw new RuntimeException(e);
        }

        // Example usage of Firebase services
		// FirestoreExample.run();
		SpringApplication.run(SmarthotelApplication.class, args);
	}

}
