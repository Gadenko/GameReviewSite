package com.github.gadenko.gamereviewsite.backend.service;

import com.github.gadenko.gamereviewsite.backend.dto.CreateGameReviewCommentDto;
import com.github.gadenko.gamereviewsite.backend.model.UserComments;
import com.github.gadenko.gamereviewsite.backend.repo.UserCommentsRepo;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import java.util.List;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class GameCommentServiceTest {

    private final UserCommentsRepo userCommentsRepo = mock(UserCommentsRepo.class);
    private final GameCommentService gameCommentService = new GameCommentService(userCommentsRepo);

    @Test
    void addNewUserComment() {
        //Given
        UserComments userCommentToAdd = UserComments
                .builder()
                .comment("Das Game ist Super")
                .commentRating("5")
                .reviewId("we233322")
                .build();
        when(userCommentsRepo.insert(userCommentToAdd)).thenReturn(UserComments
                .builder()
                .id("1234-test")
                .comment("Das Game ist Super")
                .commentRating("5")
                .reviewId("we233322")
                .build());
        //When
        CreateGameReviewCommentDto newUserComment = CreateGameReviewCommentDto
                .builder()
                .comment("Das Game ist Super")
                .commentRating("5")
                .reviewId("we233322")
                .build();
        UserComments actual = gameCommentService.addNewUserComment(newUserComment);
        //Then
        UserComments expected = UserComments
                .builder()
                .id("1234-test")
                .comment("Das Game ist Super")
                .commentRating("5")
                .reviewId("we233322")
                .build();
        verify(userCommentsRepo).insert(userCommentToAdd);
        assertEquals(expected,actual);
    }

    @Test
    void getAllComments() {
        //Given
        UserComments userComment1 = UserComments
                .builder()
                .id("1234-test")
                .comment("Das Game ist Super")
                .commentRating("5")
                .reviewId("we233322")
                .build();
        UserComments userComment2 = UserComments
                .builder()
                .id("4321-test")
                .comment("Das Game ist Toll")
                .commentRating("4")
                .reviewId("ABC333")
                .build();
        when(userCommentsRepo.findAll()).thenReturn(List.of(userComment1,userComment2));
        //When
        List<UserComments> actual = gameCommentService.getAllComments();
        //Then
        assertThat(actual, Matchers.containsInAnyOrder(userComment1,userComment2));
        verify(userCommentsRepo).findAll();
    }
}