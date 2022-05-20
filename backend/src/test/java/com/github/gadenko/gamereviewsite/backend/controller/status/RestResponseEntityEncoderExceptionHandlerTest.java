package com.github.gadenko.gamereviewsite.backend.controller.status;

import com.github.gadenko.gamereviewsite.backend.model.GameReview;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RestResponseEntityEncoderExceptionHandlerTest {

    @Autowired
    private WebTestClient testClient;

    @LocalServerPort
    private int port;

    @Test
    void handleConflict() {
        //Given
        GameReview gameReview = GameReview
                .builder()
                .id("1")
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
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

}