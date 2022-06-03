import {GameReview} from "../model/GameReview";
import {ChangeEvent, useState} from "react";
import GameReviewCard from "../components/GameReviewCard";
import {FcEmptyTrash} from "react-icons/fc";
import styled from "styled-components/macro";

type GameReviewGameReviewOverviewProps = {
    gameReviews: GameReview[];
}

export default function GameReviewHomePage({gameReviews}: GameReviewGameReviewOverviewProps) {
    const [searchTitle, setSearchTitle] = useState<string>("")
    const [searchCategory, setSearchCategory] = useState<string>("")

    return (
        <Homepage>
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
                    <HomepageButton
                        onClick={() => {
                            setSearchCategory("");
                            setSearchTitle("")
                        }}>Alle
                    </HomepageButton>
                    <HomepageButton
                        onClick={() => {
                            setSearchCategory("Strategie");
                            setSearchTitle("")
                        }}>Strategie
                    </HomepageButton>
                    <HomepageButton
                        onClick={() => {
                            setSearchCategory("RPG");
                            setSearchTitle("")
                        }}>RPG
                    </HomepageButton>
                    <HomepageButton
                        onClick={() => {
                            setSearchCategory("Abenteuer");
                            setSearchTitle("")
                        }}>Abenteuer
                    </HomepageButton>
                    <HomepageButton
                        onClick={() => {
                            setSearchCategory("Fantasy");
                            setSearchTitle("")
                        }}>Fantasy
                    </HomepageButton>
                    <HomepageButton
                        onClick={() => {
                            setSearchCategory("Simulation");
                            setSearchTitle("")
                        }}>Simulation
                    </HomepageButton>
                    <HomepageButton
                        onClick={() => {
                            setSearchCategory("Sport-und-Rennspiele");
                            setSearchTitle("")
                        }}>Sport-und-Rennspiele
                    </HomepageButton>
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
        </Homepage>
    )
}

const Homepage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 60px;
`
const HomepageButton = styled.button`
  border-radius: 4px;
  color: black;
  background-color: slategrey;
  margin-bottom: 1px;
  margin-top: 5px;
`