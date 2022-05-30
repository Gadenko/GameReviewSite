import {GameReview} from "../model/GameReview";
import {FormEvent, useState} from "react";

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
    const [ratingGametime, setRatingGametime] = useState<string>(gameReview.ratingGametime)

    const saveNewGameReview = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const updatedReview = {
            id: gameReview.id,
            title: title,
            headline: headline,
            gameDescription: gameDescription,
            picture: picture,
            category: category,
            ratingGametime: ratingGametime
        }
        updateGameReview(updatedReview)
    }
    return (
        <div>
            <picture className={"picture"}>
                <img
                    className="picture"
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
                <button type={"submit"}>Save</button>
            </form>
        </div>
    )
}