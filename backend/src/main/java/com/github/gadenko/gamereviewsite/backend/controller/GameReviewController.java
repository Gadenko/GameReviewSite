package com.github.gadenko.gamereviewsite.backend.controller;

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
    public List<GameReview> getGameReview (){
        return gameReviewService.getgameReviewService();
    }

    @PostMapping
    public GameReview postNewReview (@RequestBody GameReview newGameReview){
        return gameReviewService.addNewGameReview(newGameReview);
    }

    @DeleteMapping("{id}")
    public void deleteGameReview(@PathVariable String id){
        gameReviewService.deleteGameReview(id);
    }

}
