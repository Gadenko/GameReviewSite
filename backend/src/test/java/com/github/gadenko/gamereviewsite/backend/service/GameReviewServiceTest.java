package com.github.gadenko.gamereviewsite.backend.service;

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
    void getgameReviewService() {
        //Given
        when(gameReviewRepo.findAll()).thenReturn(List.of(
                new GameReview("1", "TES5 Skyrim", "Hält der Titel was er verspricht?", "Was für eine Fantasy Welt"),
                new GameReview("2", "X4: Foundations", "Hält der Titel was er verspricht?", "Schöner Weltraum Titel. Sehr viele möglickeiten der entfaltung im Space.")
        ));
        //When
        List<GameReview> actual = gameReviewService.getgameReviewService();
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
    when(gameReviewRepo.insert(
            new GameReview("1","TES5 Skyrim","Hält der Titel was er verspricht?","Was für eine Fantasy Welt")))
            .thenReturn(
                    new GameReview("1","TES5 Skyrim","Hält der Titel was er verspricht?","Was für eine Fantasy Welt"));
    //When
    GameReview actual = gameReviewService.addNewGameReview(new GameReview("1","TES5 Skyrim","Hält der Titel was er verspricht?","Was für eine Fantasy Welt"));
    GameReview expected =
            new GameReview("1","TES5 Skyrim","Hält der Titel was er verspricht?","Was für eine Fantasy Welt");
    //Then
    verify(gameReviewRepo).insert(new GameReview("1","TES5 Skyrim","Hält der Titel was er verspricht?","Was für eine Fantasy Welt"));
    assertEquals(expected, actual);
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