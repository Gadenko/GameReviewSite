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
                <input type={"text"}
                       placeholder={"Add a comment!"}
                       value={comment}
                       onChange={event => setComment(event.target.value)}/>
                <Box
                    sx={{
                        '& > legend': {mt: 2},
                    }}
                >
                    <Typography component="legend">Comment</Typography>
                    <Rating
                        name="simple-controlled"
                        value={commentRating}
                        onChange={(event, newValue) => {
                            setCommentRating(newValue);
                        }}
                    />
                </Box>
                <input type={"submit"}
                       value={"Add UserComment"}/>
            </form>
        </NewComment>
    )
}
const NewComment = styled.div`
  margin-top: 64px;
`
