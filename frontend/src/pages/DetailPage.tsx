import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import useDetailedGameReview from "../hook/useDetailedGameReview";

type GameReviewDetailPageProps = {
    deleteGameReview: (id: string) => void
}

export default function DetailPage({deleteGameReview}: GameReviewDetailPageProps) {
    const navigate = useNavigate();
    const {id} = useParams()
    const {detailedGameReview, getGameReviewById} = useDetailedGameReview()

    useEffect(() => {
        if (id){
            getGameReviewById(id)
        }
        //eslint-disable-next-line
    }, [id])

    return (
        <div>
            {detailedGameReview &&
                <h2>{detailedGameReview.title}{''}</h2>}
            {detailedGameReview &&
                <div>{detailedGameReview.headline}{''}</div>}
            {detailedGameReview &&
                <div>{detailedGameReview.gameDescription}{''}</div>}
            <button onClick={() => navigate(`/`)}>Back</button>
            {detailedGameReview &&
            <button onClick={() => {deleteGameReview(detailedGameReview.id)
                                    navigate('/')}}>❌</button>}

        </div>

    )
}