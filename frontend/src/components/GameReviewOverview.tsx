import {GameReview} from "../model/GameReview";
import {ChangeEvent, useState} from "react";
import GameReviewCard from "./GameReviewCard";
import NewGameReview from "./NewGameReview";

type GameReviewGameReviewOverviewProps = {
    gameReviews: GameReview[];
    addNewGameReview: (newGameReview : Omit<GameReview, "id">) => void;
    deleteGameReview: (id: string) => void;
}

export default function GameReviewOverview({gameReviews, addNewGameReview, deleteGameReview}: GameReviewGameReviewOverviewProps){
    const [search, setSearch] = useState<string>("")
    return(
        <div>
            <input type={"text"}
                   value={search}
                   placeholder={"Search"}
                   onChange={(event:ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}/>
            {gameReviews.filter(gameReview => gameReview
                .title
                .toLowerCase()
                .includes(search.toLowerCase()))
                .map(gameReview =>
                    <GameReviewCard
                        key={gameReview.id}
                        gameReviews={gameReview}
                        deleteGameReview={deleteGameReview}/>)
            }
            <NewGameReview addNewGameReview={addNewGameReview}/>
        </div>
    )
}