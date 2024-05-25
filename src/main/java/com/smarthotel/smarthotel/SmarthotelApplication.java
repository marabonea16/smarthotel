package com.smarthotel.smarthotel;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;



import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Value;
import org.graalvm.polyglot.HostAccess;

@SpringBootApplication
public class SmarthotelApplication {


	public static void main(String[] args) {
		// Initialize Firebase
		FirebaseInitializer.initialize();
		SpringApplication.run(SmarthotelApplication.class, args);

		ScriptEngineManager factory = new ScriptEngineManager();
		ScriptEngine engine = factory.getEngineByName("nashorn");

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


	}

}
