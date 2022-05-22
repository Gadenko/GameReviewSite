import {GameReview} from "../model/GameReview";
import {useState} from "react";
import GameReviewCard from "./GameReviewCard";
import NewGameReview from "./NewGameReview";

type GameReviewGameReviewOverviewProps = {
    gameReviews: GameReview[];
    addNewGameReview: (newGameReview : Omit<GameReview, "id">) => void;
}

export default function GameReviewHomePage({gameReviews, addNewGameReview}: GameReviewGameReviewOverviewProps){
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
            <NewGameReview addNewGameReview={addNewGameReview}/>
        </div>
    )
}