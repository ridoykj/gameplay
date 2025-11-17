package com.itbd.gameplay.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
public record Cheat(
        @JsonProperty("effect") String effect,
        @JsonProperty("cheatCode") String cheatCode
) {}