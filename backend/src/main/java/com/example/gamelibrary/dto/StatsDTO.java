package com.example.gamelibrary.dto;

import com.example.gamelibrary.model.GameStatus;
import lombok.*;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatsDTO {
    private long totalGames;
    private Map<GameStatus, Long> countByStatus;
    private Double averageRating;
}
