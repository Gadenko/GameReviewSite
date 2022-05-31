import {GameReview} from "../model/GameReview";
import "../css/ShowGameReviewDetails.css"
import {useState} from "react";
import {Rating} from "@mui/material";

type ShowGameReviewDetailsProps = {
    gameReview: GameReview
    toggleEditing: () => void
}

export default function ShowGameReviewDetails({gameReview}: ShowGameReviewDetailsProps) {
    const [explanationFull, setExplanationFull] = useState<boolean>(false);
    return (
        <div className="ShowDetailed">
            <picture>
                <img className="detailed-picture"
                     src={gameReview.picture}
                     alt={"Hier sollte ein Bild sein vom Spiel."}/>
            </picture>
            <div className="cardcontainer">
                <h1>{gameReview.title}</h1>
                <div>{gameReview.headline}</div>
                {explanationFull ?
                    <p>{gameReview.gameDescription}</p>
                    :
                    <>
                        <p>{gameReview.gameDescription.slice(0, 80)}...</p>
                        <button onClick={() => setExplanationFull(true)}>more</button>
                    </>
                }
                <h2>{gameReview.category}</h2>
                <div className="gametime-card">
                    <p className="gametime-p">Grafik</p>
                    <Rating className="gametime-rating" value={gameReview.graphic}/>
                    <p className="gametime-p">Sound</p>
                    <Rating className="gametime-rating" value={gameReview.sound}/>

                </div>
            </div>
        </div>
    )
}