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
        if(newGameReview.getTitle() == null){
            throw new IllegalArgumentException("Title of the given gamereview was null");
        }
        if(newGameReview.getHeadline() == null){
            throw new IllegalArgumentException("Headline of the given gamereview was null");
        }
        if(newGameReview.getGameDescription() == null){
            throw new IllegalArgumentException("GameDescription of the given gamereview was null");
        }
        if(newGameReview.getPicture() == null){
            throw new IllegalArgumentException("Picture of the given gamereview was null");
        }
        newReview.setTitle(newGameReview.getTitle());
        newReview.setHeadline(newGameReview.getHeadline());
        newReview.setGameDescription(newGameReview.getGameDescription());
        newReview.setPicture(newGameReview.getPicture());
        return gameReviewRepo.insert(newReview);
    }

    public void deleteGameReview(String id) {
        gameReviewRepo.deleteById(id);
    }

}
