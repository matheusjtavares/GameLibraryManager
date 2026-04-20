package com.example.gamelibrary.dto;

import com.example.gamelibrary.model.GameStatus;
import lombok.*;

import java.time.OffsetDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameDTO {
    private Long id;
    private String title;
    private String platform;
    private String genre;
    private String developer;
    private Integer releaseYear;
    private GameStatus status;
    private Integer rating;
    private String notes;
    private String coverUrl;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}
