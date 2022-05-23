import {GameReview} from "../model/GameReview";
import {useNavigate} from "react-router-dom";
import "../css/GameReviewCard.css"

type GameReviewCardProps = {
    gameReviews: GameReview
}

export default function GameReviewCard({gameReviews}: GameReviewCardProps) {
    const navigate = useNavigate();
    return (
        <div
            className="card"
            onClick={() => navigate(`/gamereview/${gameReviews.id}`)}>
            <div><img
                className="picture"
                src={gameReviews.picture}
                alt={"Hier sollte ein Bild sein vom Spiel."}/>
            </div>
            <div>
                <h1>{gameReviews.title}</h1>
                <div>{gameReviews.headline}</div>
            </div>
        </div>
    )
}