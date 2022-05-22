import {GameReview} from "../model/GameReview";
import {useNavigate} from "react-router-dom";

type GameReviewCardProps = {
    gameReviews: GameReview
}

export default function GameReviewCard({gameReviews}: GameReviewCardProps){
    const navigate = useNavigate();
    return(
        <div>

            <h1 onClick={() => navigate(`/gamereview/${gameReviews.id}`)}>{gameReviews.title}</h1>
            <div>{gameReviews.headline}</div>
        </div>
    )
}