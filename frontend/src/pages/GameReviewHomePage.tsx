import {GameReview} from "../model/GameReview";
import {ChangeEvent, useState} from "react";
import GameReviewCard from "../components/GameReviewCard";
import "../css/GameReviewHomePage.css"
import {FcEmptyTrash} from "react-icons/fc";

type GameReviewGameReviewOverviewProps = {
    gameReviews: GameReview[];
}

export default function GameReviewHomePage({gameReviews}: GameReviewGameReviewOverviewProps) {
    const [searchTitle, setSearchTitle] = useState<string>("")
    const [searchCategory, setSearchCategory] = useState<string>("")

    return (
        <div className="Homepage">
            <div>
                <div>
                    <input
                        type={"text"}
                        value={searchTitle}
                        placeholder={"Search"}
                        onClick={() => setSearchCategory("")}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setSearchTitle(event.target.value)}/>
                    <button onClick={() => {
                        setSearchTitle("");
                        setSearchCategory("")
                    }}><FcEmptyTrash/>
                    </button>
                </div>
                <div>
                    <button className="button-homepage"
                            onClick={() => {
                                setSearchCategory("");
                                setSearchTitle("")
                            }}>Alle
                    </button>
                    <button className="button-homepage"
                            onClick={() => {
                                setSearchCategory("Strategie");
                                setSearchTitle("")
                            }}>Strategie
                    </button>
                    <button className="button-homepage"
                            onClick={() => {
                                setSearchCategory("RPG");
                                setSearchTitle("")
                            }}>RPG
                    </button>
                    <button className="button-homepage"
                            onClick={() => {
                                setSearchCategory("Abenteuer");
                                setSearchTitle("")
                            }}>Abenteuer
                    </button>
                    <button className="button-homepage"
                            onClick={() => {
                                setSearchCategory("Fantasy");
                                setSearchTitle("")
                            }}>Fantasy
                    </button>
                    <button className="button-homepage"
                            onClick={() => {
                                setSearchCategory("Simulation");
                                setSearchTitle("")
                            }}>Simulation
                    </button>
                    <button className="button-homepage"
                            onClick={() => {
                                setSearchCategory("Sport-und-Rennspiele");
                                setSearchTitle("")
                            }}>Sport-und-Rennspiele
                    </button>
                </div>
                <div>{gameReviews.filter(gameReview => gameReview
                    .category
                    .toLowerCase()
                    .includes(searchCategory.toLowerCase()))
                    .filter(gameReview => gameReview
                        .title
                        .toLowerCase()
                        .includes(searchTitle.toLowerCase()))
                    .map(gameReview =>
                        <GameReviewCard
                            key={gameReview.id}
                            gameReviews={gameReview}
                        />)}
                </div>
            </div>
        </div>
    )
}