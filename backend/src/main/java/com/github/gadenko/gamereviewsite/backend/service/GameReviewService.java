package com.github.gadenko.gamereviewsite.backend.service;

import com.github.gadenko.gamereviewsite.backend.dto.CreateGameReviewDto;
import com.github.gadenko.gamereviewsite.backend.model.GameReview;
import com.github.gadenko.gamereviewsite.backend.repo.GameReviewRepo;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class GameReviewService {

    private final GameReviewRepo gameReviewRepo;

    public GameReviewService(GameReviewRepo gameReviewRepo) {
        this.gameReviewRepo = gameReviewRepo;
    }

    public List<GameReview> getAllGameReviews() {
        return gameReviewRepo.findAll();
    }

    public GameReview getGameReviewById(String id) {
        return gameReviewRepo.findById(id)
                .orElseThrow( () -> new NoSuchElementException("Gamereview not found with id: " + id));
    }

    public GameReview addNewGameReview(CreateGameReviewDto newGameReview) {
        GameReview newReview = new GameReview();
        newReview.setTitle(newGameReview.getTitle());
        newReview.setHeadline(newGameReview.getHeadline());
        newReview.setGameDescription(newGameReview.getGameDescription());
        return gameReviewRepo.insert(newReview);
    }

    public void deleteGameReview(String id) {
        gameReviewRepo.deleteById(id);
    }

}
