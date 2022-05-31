package com.github.gadenko.gamereviewsite.backend.controller;

import com.github.gadenko.gamereviewsite.backend.dto.CreateGameReviewDto;
import com.github.gadenko.gamereviewsite.backend.model.GameReview;
import com.github.gadenko.gamereviewsite.backend.repo.GameReviewRepo;
import org.junit.jupiter.api.Assertions;
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
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .category("RPG")
                .graphic(1)
                .sound(1)
                .build();
        GameReview gameReview2 = GameReview
                .builder()
                .title("X4: Foundations")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Schöner Weltraum Titel. Sehr viele möglickeiten der entfaltung im Space.")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .category("Simulation")
                .graphic(1)
                .sound(1)
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
                        .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                        .category("RPG")
                        .graphic(1)
                        .sound(1)
                        .build(),
                GameReview
                        .builder()
                        .id(gameReview2.getId())
                        .title("X4: Foundations")
                        .headline("Hält der Titel was er verspricht?")
                        .gameDescription("Schöner Weltraum Titel. Sehr viele möglickeiten der entfaltung im Space.")
                        .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                        .category("Simulation")
                        .graphic(1)
                        .sound(1)
                        .build());
        assertEquals(expected, actual);
    }

    @Test
    void getGameReviewById_whenIsValid(){
        //Given
        GameReview gameReview = GameReview
                .builder()
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .category("RPG")
                .graphic(1)
                .sound(1)
                .build();
        GameReview addGameReview = testClient.post()
                .uri("http://localhost:" + port + "/api/gamereview")
                .bodyValue(gameReview)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(GameReview.class)
                .returnResult()
                .getResponseBody();
        //When
        assertNotNull(addGameReview);
        GameReview actual = testClient.get()
                .uri("http://localhost:" + port + "/api/gamereview/" + addGameReview.getId())
                .exchange()
                .expectBody(GameReview.class)
                .returnResult()
                .getResponseBody();
        //Then
        assertNotNull(actual);
        GameReview expected = GameReview
                .builder()
                .id(actual.getId())
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .category("RPG")
                .graphic(1)
                .sound(1)
                .build();
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getGameReviewById_ifIdIsNotValid_shouldThrowException(){
        //Given
        GameReview gameReview = GameReview
                .builder()
                .id("1")
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .category("RPG")
                .graphic(1)
                .sound(1)
                .build();
        testClient.post()
                .uri("http://localhost:" + port + "/api/gamereview")
                .bodyValue(gameReview)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(GameReview.class)
                .returnResult()
                .getResponseBody();
        //When
        testClient.get()
                .uri("http://localhost:" + port + "/api/gamereview/" + "5")
                .exchange()
        //Then
                .expectStatus().is4xxClientError();
    }

    @Test
    void postNewReview_addAGameReview() {
        //Given
        GameReview gameReview1 = GameReview.builder()
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .category("RPG")
                .graphic(1)
                .sound(1)
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
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .category("RPG")
                .graphic(1)
                .sound(1)
                .build();
        assertEquals(24, actual.getId().length());
        assertEquals(expected, actual);
    }

    @Test
    void addElement_whenMissingField_thenThrowIllegalArgumentException(){
        CreateGameReviewDto gameReviewDto = CreateGameReviewDto
                .builder()
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .category("RPG")
                .graphic(1)
                .sound(1)
                .build();
        testClient.post()
                .uri("http://localhost:" + port + "/api/gamereview")
                .bodyValue(gameReviewDto)
                .exchange()
                .expectStatus().is4xxClientError();
    }

    @Test
    void deleteGameReview_deleteAGameReview() {
        //Given
        GameReview gameReview = GameReview
                .builder()
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .category("RPG")
                .graphic(1)
                .sound(1)
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

    @Test
    void updateGameReviewById_whenValid_thenReturnUpdatedReview() {
        //Given
        GameReview gameReview = GameReview
                .builder()
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .category("RPG")
                .graphic(1)
                .sound(1)
                .build();
        GameReview addedGameReview = testClient.post()
                .uri("http://localhost:" + port + "/api/gamereview")
                .bodyValue(gameReview)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(GameReview.class)
                .returnResult()
                .getResponseBody();
        //When
        assertNotNull(addedGameReview);
        GameReview updatedGameReview = GameReview
                .builder()
                .id(addedGameReview.getId())
                .title("X4: Foundations")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Schöner Weltraum Titel. Sehr viele möglickeiten der entfaltung im Space.")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .category("Simulation")
                .graphic(1)
                .sound(1)
                .build();
        GameReview actual = testClient.put()
                .uri("http://localhost:" + port + "/api/gamereview")
                .bodyValue(updatedGameReview)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(GameReview.class)
                .returnResult()
                .getResponseBody();
        //Then
        GameReview expected = GameReview
                .builder()
                .id(addedGameReview.getId())
                .title("X4: Foundations")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Schöner Weltraum Titel. Sehr viele möglickeiten der entfaltung im Space.")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .category("Simulation")
                .graphic(1)
                .sound(1)
                .build();
        assertEquals(expected,actual);
    }

    @Test
    void updateGameReviewById_whenIdDoesNotExist_thenReturnNewReview(){
        //Given
        GameReview gameReview = GameReview
                .builder()
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .category("RPG")
                .graphic(1)
                .sound(1)
                .build();
        GameReview addedGameReview = testClient.post()
                .uri("http://localhost:" + port + "/api/gamereview")
                .bodyValue(gameReview)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(GameReview.class)
                .returnResult()
                .getResponseBody();
        //When
        GameReview updatedGameReview = GameReview
                .builder()
                .id("23")
                .title("X4: Foundations")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Schöner Weltraum Titel. Sehr viele möglickeiten der entfaltung im Space.")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .category("Simulation")
                .graphic(1)
                .sound(1)
                .build();
        testClient.put()
                .uri("http://localhost:" + port + "/api/gamereview")
                .bodyValue(updatedGameReview)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(GameReview.class)
                .returnResult()
                .getResponseBody();
        List<GameReview> actual = testClient.get()
                .uri("/api/gamereview")
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(GameReview.class)
                .returnResult()
                .getResponseBody();
        //Then
        assertNotNull(addedGameReview);
        List<GameReview> expected = List.of(addedGameReview,updatedGameReview);
        assertEquals(expected, actual);
    }
}