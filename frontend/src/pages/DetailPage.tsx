import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useDetailedGameReview from "../hook/useDetailedGameReview";
import {BsFillArrowLeftCircleFill, BsFillDashCircleFill} from "react-icons/bs";
import EditGameReview from "../components/EditGameReview";
import ShowGameReviewDetails from "../components/ShowGameReviewDetails";
import {GameReview} from "../model/GameReview";
import styled from "styled-components/macro";


type GameReviewDetailPageProps = {
    deleteGameReview: (id: string) => void
    saveGameReview: (updatedGameReview: GameReview) => Promise<GameReview | void>
}

export default function DetailPage({deleteGameReview, saveGameReview}: GameReviewDetailPageProps) {
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
            <button onClick={() => navigate(`/`)}><BsFillArrowLeftCircleFill/></button>
            {detailedGameReview &&
                <button onClick={() => {
                    deleteGameReview(detailedGameReview.id)
                    navigate('/')
                }}><BsFillDashCircleFill/></button>}
            <button onClick={toggleEditing}>Edit item</button>
        </DetailsPage>
    )
}
const DetailsPage = styled.div`
  background-color: lightgrey;
  margin-top: 70px;
  border-radius: 30px;
  padding: 10px;
`