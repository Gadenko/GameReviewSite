package com.github.gadenko.gamereviewsite.backend.controller;

import com.github.gadenko.gamereviewsite.backend.dto.CreateGameReviewCommentDto;
import com.github.gadenko.gamereviewsite.backend.model.UserComments;
import com.github.gadenko.gamereviewsite.backend.repo.UserCommentsRepo;
import com.github.gadenko.gamereviewsite.backend.security.model.AppUser;
import com.github.gadenko.gamereviewsite.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.reactive.server.WebTestClient;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class GameCommentControllerTest {

    private String jwtToken;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private WebTestClient testClient;

    @LocalServerPort
    private int port;

    @Autowired
    private UserCommentsRepo userCommentsRepo;

    @BeforeEach
    public void cleanUp() {
        userCommentsRepo.deleteAll();
        appUserRepository.deleteAll();
        jwtToken = generateJWTToken();
    }

    @Test
    void postNewComment() {
        //Given
        UserComments userComment = UserComments
                .builder()
                .comment("Das Game ist Super")
                .commentRating("5")
                .reviewId("we233322")
                .build();
        //When
        UserComments actual = testClient.post()
                .uri("/api/comments")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(userComment)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(UserComments.class)
                .returnResult()
                .getResponseBody();
        //Then
        assertNotNull(actual);
        assertNotNull(actual.getId());
        UserComments expected = UserComments
                .builder()
                .id(actual.getId())
                .comment("Das Game ist Super")
                .commentRating("5")
                .reviewId("we233322")
                .build();
        assertEquals(24, actual.getId().length());
        assertEquals(expected, actual);
    }
    @Test
    void addElement_whenMissingField_thenThrowIllegalArgumentException(){
        CreateGameReviewCommentDto userCommentDto = CreateGameReviewCommentDto
                .builder()
                .comment("Das Game ist Super")
                .commentRating("5")
                .reviewId("we233322")
                .build();
        testClient.post()
                .uri("http://localhost:" + port + "/api/comment")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(userCommentDto)
                .exchange()
                .expectStatus().is4xxClientError();
    }

    @Test
    void getAllComments_isItValid_returnAll() {
        //Given
        UserComments userComment1 = UserComments
                .builder()
                .comment("Das Game ist Super")
                .commentRating("5")
                .reviewId("we233322")
                .build();
        UserComments userComment2 = UserComments
                .builder()
                .comment("Das Game ist Toll")
                .commentRating("4")
                .reviewId("ABC333")
                .build();
        userCommentsRepo.insert(userComment1);
        userCommentsRepo.insert(userComment2);
        //When
        List<UserComments> actual = testClient.get()
                .uri("/api/comments")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(UserComments.class)
                .returnResult()
                .getResponseBody();
        //Then
        List<UserComments> expected = List.of(
                UserComments
                        .builder()
                        .id(userComment1.getId())
                        .comment("Das Game ist Super")
                        .commentRating("5")
                        .reviewId("we233322")
                        .build(),
                UserComments
                        .builder()
                        .id(userComment2.getId())
                        .comment("Das Game ist Toll")
                        .commentRating("4")
                        .reviewId("ABC333")
                        .build());
        assertEquals(expected, actual);
    }

    private String generateJWTToken() {
        String hashedPassword = passwordEncoder.encode("passwort");
        AppUser testUser = AppUser.builder()
                .username("testuser")
                .id("123")
                .password(hashedPassword)
                .build();
        appUserRepository.save(testUser);

        return testClient.post()
                .uri("/auth/login")
                .bodyValue(AppUser.builder()
                        .username("testuser")
                        .id("123")
                        .password("passwort")
                        .build())
                .exchange()
                .expectBody(String.class)
                .returnResult()
                .getResponseBody();
    }

}