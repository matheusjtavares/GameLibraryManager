package com.example.gamelibrary.dto;

import com.example.gamelibrary.model.GameStatus;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameUpdateRequest {
    @NotBlank
    @Size(max = 200)
    private String title;

    @NotBlank
    @Size(max = 80)
    private String platform;

    @Size(max = 80)
    private String genre;

    @Size(max = 120)
    private String developer;

    @Min(1970)
    @Max(2030)
    private Integer releaseYear;

    @NotNull
    private GameStatus status;

    @Min(0)
    @Max(10)
    private Integer rating;

    private String notes;

    @Size(max = 500)
    private String coverUrl;
}
