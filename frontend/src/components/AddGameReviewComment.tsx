import {GameReviewComments} from "../model/GameReviewComments";
import React, {FormEvent, useState} from "react";
import {toast} from "react-toastify";
import styled from "styled-components/macro";
import {Box, Rating, Typography} from "@mui/material";
import {GameReview} from "../model/GameReview";

type AddGameReviewCommentProps = {
    addNewUserComment: (newUserComment: Omit<GameReviewComments, "id">) => void
    gameReview: GameReview["id"]
}

export default function AddGameReviewComment({addNewUserComment, gameReview}: AddGameReviewCommentProps) {
    const [reviewId] = useState(gameReview)
    const [comment, setComment] = useState(``)
    const [commentRating, setCommentRating] = useState<number | null>(null)

    const onAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!comment) {
            toast.error("You need a comment!");
            return
        }
        if (!commentRating) {
            toast.error("You need a rating!");
            return
        }
        const newUserComments: Omit<GameReviewComments, "id"> = {
            reviewId: reviewId,
            comment: comment,
            commentRating: commentRating
        }
        setComment(``)
        setCommentRating(null)
        addNewUserComment(newUserComments);
    }
    return (
            <NewComment>
                <form onSubmit={onAdd}>
                    <CommentInput
                        type={"text"}
                        placeholder={"Schreibe ein Kommentar!"}
                        value={comment}
                        onChange={event => setComment(event.target.value)}/>
                    <Box
                        sx={{
                            '& > legend': {mt: 2},
                        }}
                    >
                        <Typography component="legend" fontWeight="bold">Game Bewertung</Typography>
                        <Rating
                            name="simple-controlled"
                            value={commentRating}
                            onChange={(event, newValue) => {
                                setCommentRating(newValue);
                            }}
                        />
                    </Box>
                    <CommentButton type={"submit"}
                                   value={"Kommentar hinzufügen!"}/>
                </form>
            </NewComment>
    )
}
const NewComment = styled.div`
  margin-top: 34px;
  background-color: #478a78;
  border-radius: 8px;
  padding: 5px;
`
const CommentButton = styled.input`
  border-radius: 4px;
  color: black;
  background-color: slategrey;
  margin-bottom: 1px;
  margin-top: 5px;
`
const CommentInput = styled.input`
  margin-top: 5px;
  margin-bottom: -8px;
`
