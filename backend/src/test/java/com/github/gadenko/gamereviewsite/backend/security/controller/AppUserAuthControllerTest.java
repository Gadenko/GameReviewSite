package com.github.gadenko.gamereviewsite.backend.security.controller;

import com.github.gadenko.gamereviewsite.backend.security.model.AppUser;
import com.github.gadenko.gamereviewsite.backend.security.repository.AppUserRepository;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.reactive.server.WebTestClient;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AppUserAuthControllerTest {
    @Value("${game-review-app.jwt.secret}")
    private String jwtSecret;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    WebTestClient webTestClient;

    @BeforeEach
    public void cleanUp() {
        appUserRepository.deleteAll();
    }

    @Test
    void login_whenValidCredentials_thenReturnValidJWT() {
        //given
        AppUser testUser = createTestUserInRepoAndGet();

        //when
        String jwt = webTestClient.post()
                .uri("/auth/login")
                .bodyValue(AppUser.builder()
                        .username("testuser")
                        .password("passwort")
                        .build())
                .exchange()
                .expectStatus().isOk()
                .expectBody(String.class)
                .returnResult()
                .getResponseBody();

        //then
        String expected = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(jwt)
                .getBody()
                .getSubject();

        Assertions.assertEquals(expected, testUser.getUsername());
    }

    @Test
    void login_whenInvalidCredentials_thenReturnForbiddenError() {
        //given
        createTestUserInRepoAndGet();

        //when//then
        webTestClient.post()
                .uri("/auth/login")
                .bodyValue(AppUser.builder()
                        .username("testuser")
                        .password("wrong-password")
                        .build())
                .exchange()
                .expectStatus().isEqualTo(HttpStatus.FORBIDDEN);
    }

    @Test
    void postNewAppUser() {
        //Given
        AppUser appUser = AppUser
                .builder()
                .username("Hans")
                .password("geheim")
                .build();
        //When
        AppUser actual = webTestClient.post()
                .uri("/auth")
                .bodyValue(appUser)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(AppUser.class)
                .returnResult()
                .getResponseBody();
        //Then
        assertNotNull(actual);
        assertNotNull(actual.getId());
        AppUser expected = AppUser
                .builder()
                .id(actual.getId())
                .username("Hans")
                .password(actual.getPassword())
                .build();
        assertEquals(24,actual.getId().length());
        assertEquals(expected,actual);
    }

    private AppUser createTestUserInRepoAndGet() {
        String hashedPassword = passwordEncoder.encode("passwort");
        AppUser testUser = AppUser.builder()
                .username("testuser")
                .password(hashedPassword)
                .build();
        appUserRepository.save(testUser);
        return testUser;
    }
}
