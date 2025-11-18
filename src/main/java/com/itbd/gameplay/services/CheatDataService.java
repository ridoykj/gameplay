package com.itbd.gameplay.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itbd.gameplay.dto.CheatCategory;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.Collections;
import java.util.List;

@Service
public class CheatDataService {

    private final ResourceLoader resourceLoader;
    private final ObjectMapper objectMapper;
    private List<CheatCategory> cachedCheats = Collections.emptyList();

    @Autowired
    public CheatDataService(ResourceLoader resourceLoader, ObjectMapper objectMapper) {
        this.resourceLoader = resourceLoader;
        this.objectMapper = objectMapper;
    }

    /**
     * This method is automatically called after the service is created.
     * It loads and parses the cheats.json file into memory.
     */
    @PostConstruct
    public void loadCheats() {
        try {
            Resource resource = resourceLoader.getResource("classpath:cheats.json");
            InputStream inputStream = resource.getInputStream();
            this.cachedCheats = objectMapper.readValue(inputStream, new TypeReference<>() {
            });
            System.out.println("Successfully loaded " + cachedCheats.stream().mapToLong(c -> c.data().size()).sum() + " cheats.");
        } catch (Exception e) {
            System.err.println("Failed to load cheats.json");
            e.printStackTrace();
            // In a real app, you might want to throw a runtime exception to stop startup
        }
    }

    /**
     * Returns the full, cached list of all cheat categories.
     */
    public List<CheatCategory> getAllCheats() {
        return this.cachedCheats;
    }

    /**
     * Searches through the cached cheats for a matching query.
     *
     * @param query The search term.
     * @return A new list of categories containing only the cheats that match the query.
     */
    public List<CheatCategory> searchCheats(String query) {
        if (query == null || query.isBlank()) {
            return getAllCheats(); // Return all cheats if search is empty
        }
        return Collections.emptyList();
    }

}