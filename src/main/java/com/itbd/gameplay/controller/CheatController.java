package com.itbd.gameplay.controller;

import com.itbd.gameplay.dto.CheatCategory;
import com.itbd.gameplay.services.CheatDataService;
import com.itbd.gameplay.services.KeystrokeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
public class CheatController {
    private final CheatDataService cheatDataService;
    private final KeystrokeService keystrokeService;

    public CheatController(CheatDataService cheatDataService, KeystrokeService keystrokeService) {
        this.cheatDataService = cheatDataService;
        this.keystrokeService = keystrokeService;
    }

    @GetMapping("/cheats/search")
    public List<CheatCategory> searchAllCheats(@RequestParam(value = "q", required = false) String cheatQuery) {
        List<CheatCategory> searchResults = cheatDataService.searchCheats(cheatQuery);
        return searchResults;
    }

    @PostMapping("/cheats/send")
    public String sendCheat(@RequestParam("cheat") String cheat) {
        try {
            if (cheat == null || cheat.trim().isEmpty()) {
                throw new IllegalArgumentException("Cheat code cannot be empty.");
            }
            keystrokeService.sendCheatCode(cheat);
            return "Successfully sent: " + cheat;
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

}
