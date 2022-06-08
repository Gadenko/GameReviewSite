package com.github.gadenko.gamereviewsite.backend.controller;

import com.github.gadenko.gamereviewsite.backend.dto.CreateGameReviewCommentDto;
import com.github.gadenko.gamereviewsite.backend.model.UserComments;
import com.github.gadenko.gamereviewsite.backend.service.GameCommentService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class GameCommentController {

    private final GameCommentService gameCommentService;

    public GameCommentController(GameCommentService gameCommentService) {
        this.gameCommentService = gameCommentService;
    }

    @PostMapping
    public UserComments postNewComment(@RequestBody CreateGameReviewCommentDto newGameComment){
        return gameCommentService.addNewUserComment(newGameComment);
    }
    @GetMapping
    public List<UserComments> getAllComments(){
        return gameCommentService.getAllComments();
    }
}
