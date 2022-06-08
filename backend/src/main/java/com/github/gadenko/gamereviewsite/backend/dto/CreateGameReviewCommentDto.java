package com.github.gadenko.gamereviewsite.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateGameReviewCommentDto {

    private String reviewId;
    private String username;
    private String comment;
    private String commentRating;

}
