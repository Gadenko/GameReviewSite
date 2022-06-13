import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useDetailedGameReview from "../hook/useDetailedGameReview";
import {BsFillArrowLeftCircleFill, BsFillDashCircleFill} from "react-icons/bs";
import EditGameReview from "../components/EditGameReview";
import ShowGameReviewDetails from "../components/ShowGameReviewDetails";
import {GameReview} from "../model/GameReview";
import styled from "styled-components/macro";
import AddGameReviewComment from "../components/AddGameReviewComment";
import {GameReviewComments} from "../model/GameReviewComments";
import UserComentInfoCard from "../components/UserComentInfoCard";

type GameReviewDetailPageProps = {
    deleteGameReview: (id: string) => void
    saveGameReview: (updatedGameReview: GameReview) => Promise<GameReview | void>
    addNewUserComment: (newUserComment: Omit<GameReviewComments, "id">) => void
    userComments: GameReviewComments[]
}

export default function DetailPage({
                                       deleteGameReview,
                                       saveGameReview,
                                       addNewUserComment,
                                       userComments
                                   }: GameReviewDetailPageProps) {
    const navigate = useNavigate();
    const {id} = useParams();
    const {detailedGameReview, getGameReviewById, setDetailedGameReview} = useDetailedGameReview();
    const [editingEnabled, setEditingEnabled] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            getGameReviewById(id)
        }
        //eslint-disable-next-line
    }, [id])

    const toggleEditing = () => {
        setEditingEnabled(!editingEnabled);
    }
    const updateGameReview = (updatedGameReview: GameReview) => {
        saveGameReview(updatedGameReview)
            .then(() => setDetailedGameReview(updatedGameReview))
            .then(() => toggleEditing())
    }

    return (
        <DetailsPage>
            {detailedGameReview &&
                <div>
                    {editingEnabled
                        ? <EditGameReview
                            gameReview={detailedGameReview}
                            updateGameReview={updateGameReview}/>
                        : <ShowGameReviewDetails
                            gameReview={detailedGameReview}
                            toggleEditing={toggleEditing}/>
                    }
                </div>}
            <DetailpageButtons onClick={() => navigate(`/`)}><BsFillArrowLeftCircleFill/></DetailpageButtons>
            {detailedGameReview &&
                <DetailpageButtons onClick={() => {
                    deleteGameReview(detailedGameReview.id)
                    navigate('/')
                }}><BsFillDashCircleFill/></DetailpageButtons>}
            <DetailpageButtons onClick={toggleEditing}>Edit item</DetailpageButtons>
            {detailedGameReview && <AddGameReviewComment
                addNewUserComment={addNewUserComment}
                gameReview={detailedGameReview.id}/>}
            <div>
                {userComments
                    .filter(review => review.reviewId === id)
                    .map(userComment => <UserComentInfoCard
                        key={userComment.comment}
                        userComments={userComment}
                    />)}
            </div>
        </DetailsPage>
    )
}
const DetailsPage = styled.div`
  background-color: lightgrey;
  margin-top: 70px;
  border-radius: 30px;
  padding: 10px;
`

const DetailpageButtons = styled.button`
  border-radius: 4px;
  color: black;
  background-color: slategrey;
  margin-bottom: 1px;
  margin-top: 5px;
`
