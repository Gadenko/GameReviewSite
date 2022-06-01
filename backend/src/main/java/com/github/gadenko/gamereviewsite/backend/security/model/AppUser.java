package com.github.gadenko.gamereviewsite.backend.security.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@With
@AllArgsConstructor
@NoArgsConstructor
@Document("appusers")

public class AppUser {

    @Id
    private String id;

    private String username;
    private String password;
}
