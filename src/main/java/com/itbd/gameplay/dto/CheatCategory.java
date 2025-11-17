package com.itbd.gameplay.dto;

import java.util.List;

public record CheatCategory(
        String header,
        List<Cheat> data
) {}