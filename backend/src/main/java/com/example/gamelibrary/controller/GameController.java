package com.example.gamelibrary.controller;

import com.example.gamelibrary.dto.*;
import com.example.gamelibrary.model.GameStatus;
import com.example.gamelibrary.service.GameService;
import jakarta.validation.Valid;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/games")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @GetMapping
    public ResponseEntity<List<GameDTO>> getAllGames(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String platform,
            @RequestParam(required = false) String q) {
        return ResponseEntity.ok(gameService.getAllGames(status, platform, q));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameDTO> getGameById(@PathVariable Long id) {
        return ResponseEntity.ok(gameService.getGameById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<GameDTO> createGame(@Valid @RequestBody GameCreateRequest request) {
        return new ResponseEntity<>(gameService.createGame(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GameDTO> updateGame(@PathVariable Long id, @Valid @RequestBody GameUpdateRequest request) {
        return ResponseEntity.ok(gameService.updateGame(id, request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<GameDTO> updateStatus(@PathVariable Long id, @RequestBody StatusUpdateRequest request) {
        return ResponseEntity.ok(gameService.updateStatus(id, request.getStatus()));
    }

    @PatchMapping("/{id}/rating")
    public ResponseEntity<GameDTO> updateRating(@PathVariable Long id, @RequestBody RatingUpdateRequest request) {
        return ResponseEntity.ok(gameService.updateRating(id, request.getRating()));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        gameService.deleteGame(id);
        return ResponseEntity.noContent().build();
    }

    @Data
    public static class StatusUpdateRequest {
        private GameStatus status;
    }

    @Data
    public static class RatingUpdateRequest {
        private Integer rating;
    }
}
