package com.github.gadenko.gamereviewsite.backend.service;

import com.github.gadenko.gamereviewsite.backend.dto.CreateGameReviewDto;
import com.github.gadenko.gamereviewsite.backend.model.GameReview;
import com.github.gadenko.gamereviewsite.backend.repo.GameReviewRepo;
import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GameReviewServiceTest {

    private final GameReviewRepo gameReviewRepo = mock(GameReviewRepo.class);
    private final GameReviewService gameReviewService = new GameReviewService(gameReviewRepo);

    @Test
    void getAllGameReviews() {
        //Given
        when(gameReviewRepo.findAll()).thenReturn(List.of(
                new GameReview("1", "TES5 Skyrim", "Hält der Titel was er verspricht?", "Was für eine Fantasy Welt"),
                new GameReview("2", "X4: Foundations", "Hält der Titel was er verspricht?", "Schöner Weltraum Titel. Sehr viele möglickeiten der entfaltung im Space.")
        ));
        //When
        List<GameReview> actual = gameReviewService.getAllGameReviews();
        List<GameReview> expected = List.of(
                new GameReview("1", "TES5 Skyrim", "Hält der Titel was er verspricht?", "Was für eine Fantasy Welt"),
                new GameReview("2", "X4: Foundations", "Hält der Titel was er verspricht?", "Schöner Weltraum Titel. Sehr viele möglickeiten der entfaltung im Space.")
        );
        //Then
        verify(gameReviewRepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void addNewGameReview() {
        //Given
        GameReview gameReviewToAdd = GameReview
                .builder()
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .build();
        when(gameReviewRepo.insert(gameReviewToAdd)).thenReturn(GameReview
                .builder()
                .id("1234-test")
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .build());
        //WHEN
        CreateGameReviewDto newGameReview = CreateGameReviewDto.builder()
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .build();
        GameReview actual = gameReviewService.addNewGameReview(newGameReview);

        //Then
        GameReview expected = GameReview.builder()
                .id("1234-test")
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .build();
        verify(gameReviewRepo).insert(gameReviewToAdd);
        assertEquals(expected,actual);
    }

    @Test
    void deleteGameReview() {
        //GIVEN

        //WHEN
        gameReviewService.deleteGameReview("1");
        //THEN
        verify(gameReviewRepo).deleteById("1");
    }
}