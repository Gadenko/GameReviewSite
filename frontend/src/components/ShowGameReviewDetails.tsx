import {GameReview} from "../model/GameReview";
import "../css/ShowGameReviewDetails.css"

type ShowGameReviewDetailsProps = {
    gameReview: GameReview
    toggleEditing: () => void
}

export default function ShowGameReviewDetails({gameReview}: ShowGameReviewDetailsProps) {

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
                <div>{gameReview.gameDescription}</div>
                <h2>{gameReview.category}</h2>
            </div>
        </div>
    )
}