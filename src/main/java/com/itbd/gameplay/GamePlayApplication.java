package com.itbd.gameplay;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;

import java.awt.*;

@SpringBootApplication
public class GamePlayApplication {

//	public static void main(String[] args) {
//		SpringApplication.run(WebReactJsApplication.class, args);
//	}

    public static void main(String[] args) {
        try {
            SpringApplicationBuilder builder = new SpringApplicationBuilder(GamePlayApplication.class);
            builder.headless(false);
            ConfigurableApplicationContext context = builder.run(args);
        } catch (HeadlessException e) {
            System.err.println("Error: This application requires a graphical environment to simulate keystrokes.");
            System.err.println("Please run this application on a machine with a desktop environment.");
        }
    }


}
