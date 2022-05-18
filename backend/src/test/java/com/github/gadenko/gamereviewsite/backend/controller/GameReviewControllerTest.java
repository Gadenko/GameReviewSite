package com.github.gadenko.gamereviewsite.backend.controller;

import com.github.gadenko.gamereviewsite.backend.model.GameReview;
import com.github.gadenko.gamereviewsite.backend.repo.GameReviewRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.web.reactive.server.WebTestClient;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class GameReviewControllerTest {

    @Autowired
    private WebTestClient testClient;

    @LocalServerPort
    private int port;

    @Autowired
    private GameReviewRepo gameReviewRepo;

    @BeforeEach
    public void cleanUp(){
        gameReviewRepo.deleteAll();
    }

    @Test
    void getAllGameReview_isItValid_returnAll() {
        //GIVEN
        GameReview gameReview1 = GameReview
                .builder()
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .build();
        GameReview gameReview2 = GameReview
                .builder()
                .title("X4: Foundations")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Schöner Weltraum Titel. Sehr viele möglickeiten der entfaltung im Space.")
                .build();
        gameReviewRepo.insert(gameReview1);
        gameReviewRepo.insert(gameReview2);
        //When
        List<GameReview> actual = testClient.get()
                .uri("/api/gamereview")
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(GameReview.class)
                .returnResult()
                .getResponseBody();
        //Then
        List<GameReview> expected = List.of(
                GameReview
                        .builder()
                        .id(gameReview1.getId())
                        .title("TES5 Skyrim")
                        .headline("Hält der Titel was er verspricht?")
                        .gameDescription("Was für eine Fantasy Welt")
                        .build(),
                GameReview
                        .builder()
                        .id(gameReview2.getId())
                        .title("X4: Foundations")
                        .headline("Hält der Titel was er verspricht?")
                        .gameDescription("Schöner Weltraum Titel. Sehr viele möglickeiten der entfaltung im Space.")
                        .build());
        assertEquals(expected, actual);
    }

    @Test
    void postNewReview_addAGameReview() {
        //Given
        GameReview gameReview1 = GameReview.builder()
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .build();
        //When
        GameReview actual = testClient.post()
                .uri("/api/gamereview")
                .bodyValue(gameReview1)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(GameReview.class)
                .returnResult()
                .getResponseBody();
        //Then
        assertNotNull(actual);
        assertNotNull(actual.getId());
        GameReview expected = GameReview
                .builder()
                .id(actual.getId())
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .build();
        assertEquals(24, actual.getId().length());
        assertEquals(expected, actual);
    }

    @Test
    void deleteGameReview_deleteAGameReview() {
        //Given
        GameReview gameReview = GameReview
                .builder()
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .build();
        //When
        GameReview addedGameReview = testClient.post()
                .uri("http://localhost:" + port + "/api/gamereview")
                .bodyValue(gameReview)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(GameReview.class)
                .returnResult()
                .getResponseBody();
        //Then
        assertNotNull(addedGameReview);
        testClient.delete()
                .uri("http://localhost:" + port + "/api/gamereview/" + addedGameReview.getId())
                .exchange()
                //THEN
                .expectStatus().is2xxSuccessful();
    }
}