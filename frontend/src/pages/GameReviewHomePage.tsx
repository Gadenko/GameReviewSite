import {GameReview} from "../model/GameReview";
import {useState} from "react";
import GameReviewCard from "../components/GameReviewCard";

type GameReviewGameReviewOverviewProps = {
    gameReviews: GameReview[];

}

export default function GameReviewHomePage({gameReviews}: GameReviewGameReviewOverviewProps){
    const [search] = useState("");
    return(
        <div>
            {gameReviews.filter(gameReview => gameReview
                .title
                .toLowerCase()
                .includes(search.toLowerCase()))
                .map(gameReview =>
                    <GameReviewCard
                        key={gameReview.id}
                        gameReviews={gameReview}
                    />)
            }
        </div>
    )
}