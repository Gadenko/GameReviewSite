import {GameReview} from "../model/GameReview";
import React, {FormEvent, useState} from "react";
import {Box, Rating, Typography} from "@mui/material";
import styled from "styled-components/macro";

type EditGameReviewProps = {
    gameReview: GameReview
    updateGameReview: (updatedGameReview: GameReview) => void
}

export default function EditGameReview({gameReview, updateGameReview}: EditGameReviewProps) {

    const [title, setTitle] = useState<string>(gameReview.title)
    const [headline, setHeadline] = useState<string>(gameReview.headline)
    const [gameDescription, setGameDescription] = useState<string>(gameReview.gameDescription)
    const [picture, setPicture] = useState<string>(gameReview.picture)
    const [category, setCategory] = useState<string>(gameReview.category)
    const [graphic, setGraphic] = useState<number | null>(gameReview.graphic)
    const [sound, setSound] = useState<number | null>(gameReview.sound)

    const saveNewGameReview = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const updatedReview = {
            id: gameReview.id,
            title: title,
            headline: headline,
            gameDescription: gameDescription,
            picture: picture,
            category: category,
            graphic: graphic,
            sound: sound
        }
        updateGameReview(updatedReview)
    }
    return (
        <div>
            <picture>
                <EditPicture className="edit-picture"
                             src={gameReview.picture}
                             alt={"Hier sollte ein Bild sein vom Spiel."}/>
            </picture>
            <div className="cardcontainer">
                <h1>{gameReview.title}</h1>
                <div>{gameReview.headline}</div>
            </div>
            <form onSubmit={saveNewGameReview}>
                <input
                    type="text"
                    defaultValue={title}
                    onChange={e => {
                        setTitle(e.target.value)
                    }}/>
                <input
                    type="text"
                    defaultValue={headline}
                    onChange={e => {
                        setHeadline(e.target.value)
                    }}/>
                <input
                    type="text"
                    defaultValue={gameDescription}
                    onChange={e => {
                        setGameDescription(e.target.value)
                    }}/>
                <input
                    type="url"
                    defaultValue={picture}
                    onChange={e => {
                        setPicture(e.target.value)
                    }}/>
                <select
                    value={category}
                    onChange={e => {
                        setCategory(e.target.value)
                    }}>
                    <optgroup label="=Wähle eine Kategorie=">
                        <option>Strategie</option>
                        <option>RPG</option>
                        <option>Fantasy</option>
                        <option>Fantasy</option>
                        <option>Simulation</option>
                        <option>Abenteuer</option>
                        <option>Sport-und-Rennspiel</option>
                    </optgroup>
                </select>
                <Box
                    sx={{
                        '& > legend': {mt: 2},
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
                <EditButtons type={"submit"}>Save</EditButtons>
            </form>
        </div>
    )
}

const EditPicture = styled.img`
  border-radius: 30px;
  height: auto;
  width: 40%;
`
const EditButtons = styled.button`
  border-radius: 4px;
  color: black;
  background-color: slategrey;
  margin-bottom: 1px;
  margin-top: 5px;
`
