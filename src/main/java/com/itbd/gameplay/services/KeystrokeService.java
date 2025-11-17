package com.itbd.gameplay.services;
import com.sun.jna.platform.win32.User32;
import com.sun.jna.platform.win32.WinDef;
import com.sun.jna.platform.win32.WinUser;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class KeystrokeService {

    // DirectInput hardware scan codes for a standard US QWERTY layout.
    // This mapping is crucial for games that read from the hardware buffer.
    private static final Map<Character, Integer> SCAN_CODE_MAP = new HashMap<>();

    static {
        SCAN_CODE_MAP.put('A', 0x1E);
        SCAN_CODE_MAP.put('B', 0x30);
        SCAN_CODE_MAP.put('C', 0x2E);
        SCAN_CODE_MAP.put('D', 0x20);
        SCAN_CODE_MAP.put('E', 0x12);
        SCAN_CODE_MAP.put('F', 0x21);
        SCAN_CODE_MAP.put('G', 0x22);
        SCAN_CODE_MAP.put('H', 0x23);
        SCAN_CODE_MAP.put('I', 0x17);
        SCAN_CODE_MAP.put('J', 0x24);
        SCAN_CODE_MAP.put('K', 0x25);
        SCAN_CODE_MAP.put('L', 0x26);
        SCAN_CODE_MAP.put('M', 0x32);
        SCAN_CODE_MAP.put('N', 0x31);
        SCAN_CODE_MAP.put('O', 0x18);
        SCAN_CODE_MAP.put('P', 0x19);
        SCAN_CODE_MAP.put('Q', 0x10);
        SCAN_CODE_MAP.put('R', 0x13);
        SCAN_CODE_MAP.put('S', 0x1F);
        SCAN_CODE_MAP.put('T', 0x14);
        SCAN_CODE_MAP.put('U', 0x16);
        SCAN_CODE_MAP.put('V', 0x2F);
        SCAN_CODE_MAP.put('W', 0x11);
        SCAN_CODE_MAP.put('X', 0x2D);
        SCAN_CODE_MAP.put('Y', 0x15);
        SCAN_CODE_MAP.put('Z', 0x2C);
        // Add numbers if your cheat codes need them
        SCAN_CODE_MAP.put('1', 0x02);
        SCAN_CODE_MAP.put('2', 0x03);
        SCAN_CODE_MAP.put('3', 0x04);
        // ... and so on
    }

    // You can adjust these delays if the cheat codes are not registering
    private static final int DELAY_AFTER_FOCUS_MS = 200;
    private static final int DELAY_BETWEEN_KEYS_MS = 300;
    private static final int DELAY_KEY_PRESS_MS = 50;

    public void sendCheatCode(String cheatCode) throws Exception {
        // Common window titles are "GTA: San Andreas" or just "Grand Theft Auto: San Andreas"
        // Check your game's actual window title in Task Manager if it fails.
        WinDef.HWND hwnd = User32.INSTANCE.FindWindow(null, "GTA: San Andreas");

        if (hwnd == null) {
            throw new IllegalStateException("GTA: San Andreas window not found. Please ensure the game is running.");
        }

        // This is a critical step to bring the game into the foreground.
        User32.INSTANCE.SetForegroundWindow(hwnd);
        User32.INSTANCE.ShowWindow(hwnd, WinUser.SW_RESTORE);

        // Give the OS and game time to process the focus change.
        Thread.sleep(DELAY_AFTER_FOCUS_MS);

        for (char c : cheatCode.toUpperCase().toCharArray()) {
            Integer scanCode = SCAN_CODE_MAP.get(c);
            if (scanCode != null) {
                pressKeyWithScanCode(scanCode);
                Thread.sleep(DELAY_BETWEEN_KEYS_MS);
            } else {
                System.err.println("No scan code found for character: " + c);
            }
        }
    }

    private void pressKeyWithScanCode(int scanCode) throws InterruptedException {
        WinUser.INPUT input = new WinUser.INPUT();
        input.type = new WinDef.DWORD(WinUser.INPUT.INPUT_KEYBOARD);
        input.input.setType("ki"); // Set to the KEYBDINPUT structure
        input.input.ki.wScan = new WinDef.WORD(scanCode);
        input.input.ki.dwFlags = new WinDef.DWORD(WinUser.KEYBDINPUT.KEYEVENTF_SCANCODE); // Use scan code

        // Press the key
        User32.INSTANCE.SendInput(new WinDef.DWORD(1), (WinUser.INPUT[]) input.toArray(1), input.size());

        // A tiny delay between press and release, simulating a real key press
        Thread.sleep(DELAY_KEY_PRESS_MS);

        // Release the key
        input.input.ki.dwFlags = new WinDef.DWORD(WinUser.KEYBDINPUT.KEYEVENTF_SCANCODE | WinUser.KEYBDINPUT.KEYEVENTF_KEYUP);
        User32.INSTANCE.SendInput(new WinDef.DWORD(1), (WinUser.INPUT[]) input.toArray(1), input.size());
    }
}