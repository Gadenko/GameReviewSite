import {GameReview} from "../model/GameReview";
import {useState} from "react";
import {Rating} from "@mui/material";
import styled from "styled-components/macro";

type ShowGameReviewDetailsProps = {
    gameReview: GameReview
    toggleEditing: () => void
}

export default function ShowGameReviewDetails({gameReview}: ShowGameReviewDetailsProps) {
    const [explanationFull, setExplanationFull] = useState<boolean>(false);
    return (
        <div>
            <picture>
                <DetailedPicture className="detailed-picture"
                                 src={gameReview.picture}
                                 alt={"Hier sollte ein Bild sein vom Spiel."}/>
            </picture>
            <div className="cardcontainer">
                <h1>{gameReview.title}</h1>
                <div>{gameReview.headline}</div>
                {explanationFull ?
                    <p>{gameReview.gameDescription}</p>
                    :
                    <>
                        <p>{gameReview.gameDescription.slice(0, 80)}...</p>
                        <button onClick={() => setExplanationFull(true)}>more</button>
                    </>
                }
                <h2>{gameReview.category}</h2>
                <GameCard>
                    <GameRatingHead>Grafik</GameRatingHead>
                    <Rating value={gameReview.graphic}/>
                    <GameRatingHead>Sound</GameRatingHead>
                    <Rating value={gameReview.sound}/>

                </GameCard>
            </div>
        </div>
    )
}

const DetailedPicture = styled.img`
  border-radius: 30px;
  height: auto;
  width: 40%;
  border-radius: 30px;
`
const GameCard = styled.div`
  border-radius: 8px;
  background-color: #478a78;
`
const GameRatingHead = styled.p`
  margin-bottom: -5px;
  margin-top: -5px;
  padding: 5px;
  font-weight: bold;
`