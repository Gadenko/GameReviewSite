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
@Document(collection="comments")
public class UserComments {

        @Id
        private String id;
        private String reviewId;
        private String comment;
        private String commentRating;

}
