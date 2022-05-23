package com.github.gadenko.gamereviewsite.backend.service;

import com.github.gadenko.gamereviewsite.backend.dto.CreateGameReviewDto;
import com.github.gadenko.gamereviewsite.backend.model.GameReview;
import com.github.gadenko.gamereviewsite.backend.repo.GameReviewRepo;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
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
               .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
               .build();
       GameReview gameReview2 = GameReview
               .builder()
               .id("test-1234")
               .title("X4: Foundations")
               .headline("Hält der Titel was er verspricht?")
               .gameDescription("Schöner Weltraum Titel. Sehr viele möglickeiten der entfaltung im Space.")
               .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
               .build();

        when(gameReviewRepo.findAll()).thenReturn(List.of(gameReview1,gameReview2));
        //When
        List<GameReview> actual = gameReviewService.getAllGameReviews();
        //Then
        assertThat(actual, Matchers.containsInAnyOrder(gameReview1,gameReview2));
        verify(gameReviewRepo).findAll();
    }

    @Test
    void getGameReviewById_whenIsValid(){
        //Given
        when(gameReviewRepo.findById("1")).thenReturn(
                Optional.of(GameReview
                        .builder()
                        .id("1")
                        .title("X4: Foundations")
                        .headline("Hält der Titel was er verspricht?")
                        .gameDescription("Schöner Weltraum Titel. Sehr viele möglickeiten der entfaltung im Space.")
                        .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                        .build()));
        //When
        GameReview actual = gameReviewService.getGameReviewById("1");
        //Then
        GameReview expected = GameReview
                .builder()
                .id("1")
                .title("X4: Foundations")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Schöner Weltraum Titel. Sehr viele möglickeiten der entfaltung im Space.")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .build();

        verify(gameReviewRepo).findById("1");
        assertEquals(expected,actual);
    }

    @Test
    void getGameReviewById_ifIdIsNotValid_shouldThrowException(){
        //Given
        when(gameReviewRepo.findById("1")).thenReturn(Optional.empty());
        //When  //Then
        assertThrows(NoSuchElementException.class, () -> gameReviewService.getGameReviewById("1"));
        verify(gameReviewRepo).findById("1");
    }

    @Test
    void addNewGameReview() {
        //Given
        GameReview gameReviewToAdd = GameReview
                .builder()
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .build();
        when(gameReviewRepo.insert(gameReviewToAdd)).thenReturn(GameReview
                .builder()
                .id("1234-test")
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .build());
        //WHEN
        CreateGameReviewDto newGameReview = CreateGameReviewDto.builder()
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
                .build();
        GameReview actual = gameReviewService.addNewGameReview(newGameReview);

        //Then
        GameReview expected = GameReview.builder()
                .id("1234-test")
                .title("TES5 Skyrim")
                .headline("Hält der Titel was er verspricht?")
                .gameDescription("Was für eine Fantasy Welt")
                .picture("https://upload.wikimedia.org/wikipedia/en/2/26/X4_Foundations_Steam_Cover_Art.jpg")
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