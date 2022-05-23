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
            <img src={gameReviews.picture} alt={"https://www.google.de/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fde%2Fimages%2Fbaustelle-im-internet%2F171033343&psig=AOvVaw1jdncBwykP1lK_8eJBRd0J&ust=1653381719340000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNCR8IOd9fcCFQAAAAAdAAAAABAD"}/>
        </div>
    )
}