package com.github.gadenko.gamereviewsite.backend.security.repository;


import com.github.gadenko.gamereviewsite.backend.security.model.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AppUserRepository extends MongoRepository<AppUser, String> {
    Optional<AppUser> findByUsername(String username);

}
