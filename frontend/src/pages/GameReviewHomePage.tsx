import {GameReview} from "../model/GameReview";
import {ChangeEvent, useState} from "react";
import GameReviewCard from "../components/GameReviewCard";
import "../css/GameReviewHomePage.css"

type GameReviewGameReviewOverviewProps = {
    gameReviews: GameReview[];

}

export default function GameReviewHomePage({gameReviews}: GameReviewGameReviewOverviewProps){
    const [search, setSearch] = useState<string>("")
    return(
        <div className="Homepage">
            <input
                type={"text"}
                value={search}
                placeholder={"Search"}
                onChange={(event:ChangeEvent<HTMLInputElement>) =>
                    setSearch(event.target.value)}/>
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