import {GameReview} from "../model/GameReview";

type ShowGameReviewDetailsProps = {
    gameReview: GameReview
    toggleEditing: () => void
}

export default function ShowGameReviewDetails({gameReview}: ShowGameReviewDetailsProps) {

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
                <div>{gameReview.gameDescription}</div>
            </div>
        </div>
    )
}