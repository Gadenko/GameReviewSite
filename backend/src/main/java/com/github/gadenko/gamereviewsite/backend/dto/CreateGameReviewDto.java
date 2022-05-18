package com.github.gadenko.gamereviewsite.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateGameReviewDto {

    private String title;
    private String headline;
    private String gameDescription;

}