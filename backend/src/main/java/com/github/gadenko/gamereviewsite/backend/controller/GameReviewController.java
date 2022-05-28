package com.github.gadenko.gamereviewsite.backend.controller;

import com.github.gadenko.gamereviewsite.backend.dto.CreateGameReviewDto;
import com.github.gadenko.gamereviewsite.backend.model.GameReview;
import com.github.gadenko.gamereviewsite.backend.service.GameReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/gamereview")
public class GameReviewController {

    private final GameReviewService gameReviewService;
    @Autowired
    public GameReviewController(GameReviewService gameReviewService) {
        this.gameReviewService = gameReviewService;
    }

    @GetMapping
    public List<GameReview> getAllGameReviews (){
        return gameReviewService.getAllGameReviews();
    }

    @GetMapping("{id}")
    public GameReview getGameReviewById(@PathVariable String id){
        return gameReviewService.getGameReviewById(id);
    }

    @PostMapping
    public GameReview postNewReview (@RequestBody CreateGameReviewDto newGameReview){
        return gameReviewService.addNewGameReview(newGameReview);
    }

    @DeleteMapping("{id}")
    public void deleteGameReview(@PathVariable String id){
        gameReviewService.deleteGameReview(id);
    }

    @PutMapping()
    public GameReview updateGameReviewById(@RequestBody GameReview updatedGameReview){
     return gameReviewService.updateGameReviewById(updatedGameReview);
    }
}
