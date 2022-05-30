package com.github.gadenko.gamereviewsite.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection="reviews")
public class GameReview {

    @Id
    private String id;
    private String title;
    private String headline;
    private String gameDescription;
    private String picture;
    private String category;
    private String ratingGametime;

}
