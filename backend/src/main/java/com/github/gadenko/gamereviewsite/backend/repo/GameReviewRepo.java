package com.github.gadenko.gamereviewsite.backend.repo;

import com.github.gadenko.gamereviewsite.backend.model.GameReview;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameReviewRepo extends MongoRepository<GameReview, String> {
}
