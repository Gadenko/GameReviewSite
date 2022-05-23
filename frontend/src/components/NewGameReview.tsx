import {GameReview} from "../model/GameReview";
import {FormEvent, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

type NewGameReviewProps = {
    addNewGameReview: (newGameReview: Omit<GameReview, "id">) => void
}

export default function NewGameReview({addNewGameReview}: NewGameReviewProps) {
    const [title, setTitle] = useState(``)
    const [headline, setHeadline] = useState(``)
    const [gameDescription, setGameDescription] = useState(``)
    const navigate = useNavigate();

    const onAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title) {
            toast.error("You need a title");
            return
        }
        if (!headline) {
            toast.error("You need a headline");
            return
        }
        if (!gameDescription) {
            toast.error("You need a gameDescription");
            return
        }
        const newGameReview: Omit<GameReview, "id"> = {
            title: title,
            headline: headline,
            gameDescription: gameDescription
        }
        addNewGameReview(newGameReview);
        setTitle(``)
        setHeadline(``)
        setGameDescription(``)
        navigate('/')
    }
    return (
        <div>
            <form onSubmit={onAdd}>
                <input type={"text"}
                       placeholder={"Add a Title"}
                       value={title}
                       onChange={event => setTitle(event.target.value)}/>
                <input type={"text"}
                       placeholder={"Add a headline"}
                       value={headline}
                       onChange={event => setHeadline(event.target.value)}/>
                <input type={"text"}
                       placeholder={"Add a gameDescription"}
                       value={gameDescription}
                       onChange={event => setGameDescription(event.target.value)}/>
                <input type={"submit"}
                       value={"Add GameReview"}/>
            </form>
        </div>
    )
}