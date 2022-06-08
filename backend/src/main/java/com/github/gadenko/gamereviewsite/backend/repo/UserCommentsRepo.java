package com.github.gadenko.gamereviewsite.backend.repo;

import com.github.gadenko.gamereviewsite.backend.model.UserComments;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCommentsRepo extends MongoRepository<UserComments, String> {
}
