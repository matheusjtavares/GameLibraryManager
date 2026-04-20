package com.example.gamelibrary.repository;

import com.example.gamelibrary.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByTitleContainingIgnoreCase(String title);
    List<Game> findByPlatformIgnoreCase(String platform);
    List<Game> findByStatus(com.example.gamelibrary.model.GameStatus status);
}
