package com.github.gadenko.gamereviewsite.backend.service;

import com.github.gadenko.gamereviewsite.backend.model.GameReview;
import com.github.gadenko.gamereviewsite.backend.repo.GameReviewRepo;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GameReviewService {

    private final GameReviewRepo gameReviewRepo;

    public GameReviewService(GameReviewRepo gameReviewRepo) {
        this.gameReviewRepo = gameReviewRepo;
    }

    public List<GameReview> getgameReviewService() {
        return gameReviewRepo.findAll();
    }

    public GameReview addNewGameReview(GameReview newGameReview) {
        return gameReviewRepo.insert(newGameReview);
    }

    public void deleteGameReview(String id) {
        gameReviewRepo.deleteById(id);
    }

}
