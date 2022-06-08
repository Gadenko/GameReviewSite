package com.github.gadenko.gamereviewsite.backend.service;

import com.github.gadenko.gamereviewsite.backend.dto.CreateGameReviewCommentDto;
import com.github.gadenko.gamereviewsite.backend.model.UserComments;
import com.github.gadenko.gamereviewsite.backend.repo.UserCommentsRepo;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GameCommentService {

    private final UserCommentsRepo userCommentsRepo;

    public GameCommentService(UserCommentsRepo userCommentsRepo) {
        this.userCommentsRepo = userCommentsRepo;
    }

    public UserComments addNewUserComment(CreateGameReviewCommentDto newGameComment) {
        UserComments newComment = new UserComments();

        if (newGameComment.getComment() == null) {
            throw new IllegalArgumentException("Comment of the given gamereview was null");
        }
        if (newGameComment.getCommentRating() == null) {
            throw new IllegalArgumentException("Rating of the given gamereview was null");
        }

        newComment.setReviewId(newGameComment.getReviewId());
        newComment.setComment(newGameComment.getComment());
        newComment.setCommentRating(newGameComment.getCommentRating());

        return userCommentsRepo.insert(newComment);
    }

    public List<UserComments> getAllComments() {
        return userCommentsRepo.findAll();
    }
}
