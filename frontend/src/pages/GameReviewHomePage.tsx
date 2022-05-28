import {GameReview} from "../model/GameReview";
import {useState} from "react";
import GameReviewCard from "../components/GameReviewCard";
import "../css/GameReviewHomePage.css"

type GameReviewGameReviewOverviewProps = {
    gameReviews: GameReview[];

}

export default function GameReviewHomePage({gameReviews}: GameReviewGameReviewOverviewProps){
    const [search] = useState("");
    return(
        <div className="Homepage">
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