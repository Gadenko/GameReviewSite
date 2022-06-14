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
                <Category>{gameReview.category} Game</Category>
                <HeadlineText>{gameReview.headline}</HeadlineText>
                {explanationFull ?
                    <p>{gameReview.gameDescription}</p>
                    :
                    <>
                        <p>{gameReview.gameDescription.slice(0, 80)}...</p>
                        <MoreButton onClick={() => setExplanationFull(true)}>more</MoreButton>
                    </>
                }
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
const HeadlineText = styled.div`
  font-weight: bold;
`
const Category = styled.p`
  font-weight: bold;
  text-decoration: underline;
  margin-top: -10px;
`
const MoreButton = styled.button`
  border-radius: 4px;
  color: black;
  background-color: slategrey;
  margin-bottom: 15px;
  margin-top: 5px;
`
const DetailedPicture = styled.img`
  border-radius: 30px;
  height: auto;
  width: 40%;
  border-radius: 30px;
`
const GameCard = styled.div`
  border-radius: 8px;
  background-color: #758680;
`
const GameRatingHead = styled.p`
  margin-bottom: -5px;
  margin-top: -5px;
  padding: 5px;
  font-weight: bold;
`
