import {GameReview} from "../model/GameReview";
import {useNavigate} from "react-router-dom";
import styled from "styled-components/macro";

type GameReviewCardProps = {
    gameReviews: GameReview
}

export default function GameReviewCard({gameReviews}: GameReviewCardProps) {
    const navigate = useNavigate();
    return (
        <WrapperCard
            onClick={() => navigate(`/gamereview/${gameReviews.id}`)}>
            <PictureGamecard>
                <PictureGamecardDetails
                    src={gameReviews.picture}
                    alt={"Hier sollte ein Bild sein vom Spiel."}/>
            </PictureGamecard>
            <div>
                <TitleCard>{gameReviews.title}</TitleCard>
                <HeadlineCard>{gameReviews.headline}</HeadlineCard>
            </div>
        </WrapperCard>
    )
}

const WrapperCard = styled.div`
  background-color: lightgrey;
  margin-top: 10px;
  border-radius: 30px;
`
const PictureGamecard = styled.div`
  border-radius: 30px;
  font-size: 15px;
  padding: 10px;
  margin-bottom: -20px;
`

const PictureGamecardDetails = styled.img`
  height: auto;
  width: 40%;
  border-radius: 30px;
`

const TitleCard = styled.h1`
  padding: 10px;
  margin-bottom: -20px;
`
const HeadlineCard = styled.div`
  padding: 10px;
`