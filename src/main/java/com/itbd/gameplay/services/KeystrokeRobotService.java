package com.itbd.gameplay.services;

import org.springframework.stereotype.Service;

import java.awt.*;
import java.awt.event.KeyEvent;

@Service
public class KeystrokeRobotService {

    private final Robot robot;

    public KeystrokeRobotService() {
        try {
            this.robot = new Robot();
        } catch (AWTException e) {
            throw new RuntimeException("Failed to initialize Robot", e);
        }
    }

    public void typeString(String text) {
        for (char c : text.toCharArray()) {
            typeCharacter(c);
        }
    }

    private void typeCharacter(char character) {
        try {
            int keyCode = KeyEvent.getExtendedKeyCodeForChar(character);
            if (KeyEvent.CHAR_UNDEFINED == keyCode) {
                // Handle special characters that don't have a direct key code
                typeSpecialCharacter(character);
            } else {
                boolean isUpperCase = Character.isUpperCase(character);
                if (isUpperCase) {
                    robot.keyPress(KeyEvent.VK_SHIFT);
                }
                robot.keyPress(keyCode);
                robot.keyRelease(keyCode);
                if (isUpperCase) {
                    robot.keyRelease(KeyEvent.VK_SHIFT);
                }
            }
            // Add a small delay between keystrokes to ensure reliability
            robot.delay(10);
        } catch (IllegalArgumentException e) {
            System.err.println("Cannot type character: " + character);
        }
    }

    private void typeSpecialCharacter(char character) {
        switch (character) {
            case '!':
                typeWithShift(KeyEvent.VK_1);
                break;
            case '@':
                typeWithShift(KeyEvent.VK_2);
                break;
            case '#':
                typeWithShift(KeyEvent.VK_3);
                break;
            case '$':
                typeWithShift(KeyEvent.VK_4);
                break;
            case '%':
                typeWithShift(KeyEvent.VK_5);
                break;
            case '^':
                typeWithShift(KeyEvent.VK_6);
                break;
            case '&':
                typeWithShift(KeyEvent.VK_7);
                break;
            case '*':
                typeWithShift(KeyEvent.VK_8);
                break;
            case '(':
                typeWithShift(KeyEvent.VK_9);
                break;
            case ')':
                typeWithShift(KeyEvent.VK_0);
                break;
            case '_':
                typeWithShift(KeyEvent.VK_MINUS);
                break;
            case '+':
                typeWithShift(KeyEvent.VK_EQUALS);
                break;
            case '{':
                typeWithShift(KeyEvent.VK_OPEN_BRACKET);
                break;
            case '}':
                typeWithShift(KeyEvent.VK_CLOSE_BRACKET);
                break;
            case '|':
                typeWithShift(KeyEvent.VK_BACK_SLASH);
                break;
            case ':':
                typeWithShift(KeyEvent.VK_SEMICOLON);
                break;
            case '"':
                typeWithShift(KeyEvent.VK_QUOTE);
                break;
            case '<':
                typeWithShift(KeyEvent.VK_COMMA);
                break;
            case '>':
                typeWithShift(KeyEvent.VK_PERIOD);
                break;
            case '?':
                typeWithShift(KeyEvent.VK_SLASH);
                break;
            default:
                // For other special characters, you might need to use ALT codes or other methods
                System.err.println("Unsupported special character: " + character);
        }
    }

    private void typeWithShift(int keyCode) {
        robot.keyPress(KeyEvent.VK_SHIFT);
        robot.keyPress(keyCode);
        robot.keyRelease(keyCode);
        robot.keyRelease(KeyEvent.VK_SHIFT);
    }
}