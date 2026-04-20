package com.example.gamelibrary.service;

import com.example.gamelibrary.dto.*;
import com.example.gamelibrary.exception.GameNotFoundException;
import com.example.gamelibrary.model.*;
import com.example.gamelibrary.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;

    public List<GameDTO> getAllGames(String status, String platform, String q) {
        List<Game> games;
        if (status != null) {
            games = gameRepository.findByStatus(GameStatus.valueOf(status));
        } else if (platform != null) {
            games = gameRepository.findByPlatformIgnoreCase(platform);
        } else if (q != null) {
            games = gameRepository.findByTitleContainingIgnoreCase(q);
        } else {
            games = gameRepository.findAll();
        }
        return games.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public GameDTO getGameById(Long id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new GameNotFoundException("Game not found: " + id));
        return mapToDTO(game);
    }

    @Transactional
    public GameDTO createGame(GameCreateRequest request) {
        Game game = Game.builder()
                .title(request.getTitle())
                .platform(request.getPlatform())
                .genre(request.getGenre())
                .developer(request.getDeveloper())
                .releaseYear(request.getReleaseYear())
                .status(request.getStatus())
                .rating(request.getRating())
                .notes(request.getNotes())
                .coverUrl(request.getCoverUrl())
                .build();
        
        return mapToDTO(gameRepository.save(game));
    }

    @Transactional
    public GameDTO updateGame(Long id, GameUpdateRequest request) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new GameNotFoundException("Game not found: " + id));

        game.setTitle(request.getTitle());
        game.setPlatform(request.getPlatform());
        game.setGenre(request.getGenre());
        game.setDeveloper(request.getDeveloper());
        game.setReleaseYear(request.getReleaseYear());
        game.setStatus(request.getStatus());
        game.setRating(request.getRating());
        game.setNotes(request.getNotes());
        game.setCoverUrl(request.getCoverUrl());

        return mapToDTO(gameRepository.save(game));
    }

    @Transactional
    public GameDTO updateStatus(Long id, GameStatus status) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new GameNotFoundException("Game not found: " + id));
        game.setStatus(status);
        return mapToDTO(gameRepository.save(game));
    }

    @Transactional
    public GameDTO updateRating(Long id, Integer rating) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new GameNotFoundException("Game not found: " + id));
        game.setRating(rating);
        return mapToDTO(gameRepository.save(game));
    }

    @Transactional
    public void deleteGame(Long id) {
        if (!gameRepository.existsById(id)) {
            throw new GameNotFoundException("Game not found: " + id);
        }
        gameRepository.deleteById(id);
    }

    public StatsDTO getStats() {
        List<Game> allGames = gameRepository.findAll();
        long total = allGames.size();
        
        Map<GameStatus, Long> countByStatus = allGames.stream()
                .collect(Collectors.groupingBy(Game::getStatus, Collectors.counting()));

        Double avgRating = allGames.stream()
                .filter(g -> g.getRating() != null)
                .mapToInt(Game::getRating)
                .average()
                .orElse(0.0);

        return StatsDTO.builder()
                .totalGames(total)
                .countByStatus(countByStatus)
                .averageRating(avgRating)
                .build();
    }

    private GameDTO mapToDTO(Game game) {
        return GameDTO.builder()
                .id(game.getId())
                .title(game.getTitle())
                .platform(game.getPlatform())
                .genre(game.getGenre())
                .developer(game.getDeveloper())
                .releaseYear(game.getReleaseYear())
                .status(game.getStatus())
                .rating(game.getRating())
                .notes(game.getNotes())
                .coverUrl(game.getCoverUrl())
                .createdAt(game.getCreatedAt())
                .updatedAt(game.getUpdatedAt())
                .build();
    }
}
