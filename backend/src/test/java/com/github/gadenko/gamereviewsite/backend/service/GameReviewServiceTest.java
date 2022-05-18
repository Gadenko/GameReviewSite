package com.github.gadenko.gamereviewsite.backend.service;

import com.github.gadenko.gamereviewsite.backend.dto.CreateGameReviewDto;
import com.github.gadenko.gamereviewsite.backend.model.GameReview;
import com.github.gadenko.gamereviewsite.backend.repo.GameReviewRepo;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.hamcrest.MatcherAssert.assertThat;

class GameReviewServiceTest {

    private final GameReviewRepo gameReviewRepo = mock(GameReviewRepo.class);
    private final GameReviewService gameReviewService = new GameReviewService(gameReviewRepo);

    @Test
    void getAllGameReviews() {
        //Given
       GameReview gameReview1 = GameReview
               .builder()
               .id("1234-test")
               .title("TES5 Skyrim")
               .headline("Hält der Titel was er verspricht?")
               .gameDescription("Was für eine Fantasy Welt")
               .build();
       GameReview gameReview2 = GameReview
               .builder()
               .id("test-1234")
               .title("X4: Foundations")
               .headline("Hält der Titel was er verspricht?")
               .gameDescription("Schöner Weltraum Titel. Sehr viele möglickeiten der entfaltung im Space.")
               .build();

        when(gameReviewRepo.findAll()).thenReturn(List.of(gameReview1,gameReview2));
        //When
        List<GameReview> actual = gameReviewService.getAllGameReviews();
        //Then
        assertThat(actual, Matchers.containsInAnyOrder(gameReview1,gameReview2));
        verify(gameReviewRepo).findAll();
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