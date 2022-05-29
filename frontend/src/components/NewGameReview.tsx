import {GameReview} from "../model/GameReview";
import {FormEvent, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import "../css/NewGameReview.css"

type NewGameReviewProps = {
    addNewGameReview: (newGameReview: Omit<GameReview, "id">) => void
}

export default function NewGameReview({addNewGameReview}: NewGameReviewProps) {
    const [title, setTitle] = useState(``)
    const [headline, setHeadline] = useState(``)
    const [gameDescription, setGameDescription] = useState(``)
    const [picture, setPicture] = useState(``)
    const [category, setCategory] = useState('')
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
            category: category
        }
        addNewGameReview(newGameReview);
        setTitle(``)
        setHeadline(``)
        setGameDescription(``)
        setPicture(``)
        setCategory(``)
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
                <input type={"submit"}
                       value={"Add GameReview"}/>
            </form>
        </div>
    )
}