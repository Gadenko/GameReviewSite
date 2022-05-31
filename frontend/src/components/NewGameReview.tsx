import {GameReview} from "../model/GameReview";
import React, {FormEvent, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import "../css/NewGameReview.css"
import {Box, Rating, Typography} from "@mui/material";

type NewGameReviewProps = {
    addNewGameReview: (newGameReview: Omit<GameReview, "id">) => void
}

export default function NewGameReview({addNewGameReview}: NewGameReviewProps) {
    const [title, setTitle] = useState(``)
    const [headline, setHeadline] = useState(``)
    const [gameDescription, setGameDescription] = useState(``)
    const [picture, setPicture] = useState(``)
    const [category, setCategory] = useState('')
    const [graphic, setGraphic] = useState<number | null>(null)
    const [sound, setSound] = useState<number | null>(null)
    const navigate = useNavigate();

    const onAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title) {
            toast.error("You need a title!");
            return
        }
        if (!headline) {
            toast.error("You need a headline!");
            return
        }
        if (!gameDescription) {
            toast.error("You need a gameDescription!");
            return
        }
        if (!picture) {
            toast.error("You need a picture!");
            return
        }
        if (!category) {
            toast.error("You need a category!");
            return
        }
        const newGameReview: Omit<GameReview, "id"> = {
            title: title,
            headline: headline,
            gameDescription: gameDescription,
            picture: picture,
            category: category,
            graphic: graphic,
            sound: sound
        }
        addNewGameReview(newGameReview);
        setTitle(``)
        setHeadline(``)
        setGameDescription(``)
        setPicture(``)
        setCategory(``)
        setGraphic(null)
        setSound(null)
        navigate('/')
    }
    return (
        <div className="new-review">
            <form onSubmit={onAdd}>
                <input type={"text"}
                       placeholder={"Add a Title!"}
                       value={title}
                       onChange={event => setTitle(event.target.value)}/>
                <input type={"text"}
                       placeholder={"Add a headline!"}
                       value={headline}
                       onChange={event => setHeadline(event.target.value)}/>
                <input type={"text"}
                       placeholder={"Add a gameDescription!"}
                       value={gameDescription}
                       onChange={event => setGameDescription(event.target.value)}/>
                <input type={"url"}
                       placeholder={"Add a picture!"}
                       value={picture}
                       onChange={event => setPicture(event.target.value)}/>
                <select
                    value={category}
                    onChange={event => setCategory(event.target.value)}>
                    <optgroup label="=Wähle eine Kategorie=">
                        <option>Strategie</option>
                        <option>RPG</option>
                        <option>Fantasy</option>
                        <option>Simulation</option>
                        <option>Abenteuer</option>
                        <option>Sport-und-Rennspiel</option>
                    </optgroup>
                </select>
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    <Typography component="legend">Grafik</Typography>
                    <Rating
                        name="simple-controlled"
                        value={graphic}
                        onChange={(event, newValue) => {
                            setGraphic(newValue);
                        }}
                    />
                    <Typography component="legend">Sound</Typography>
                    <Rating
                        name="simple-controlled"
                        value={sound}
                        onChange={(event, newValue) => {
                            setSound(newValue);
                        }}
                    />
                </Box>
                <input type={"submit"}
                       value={"Add GameReview"}/>
            </form>
        </div>
    )
}