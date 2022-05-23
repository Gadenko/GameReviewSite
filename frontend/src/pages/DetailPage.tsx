import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import useDetailedGameReview from "../hook/useDetailedGameReview";
import "../css/Detailspage.css"

type GameReviewDetailPageProps = {
    deleteGameReview: (id: string) => void
}

export default function DetailPage({deleteGameReview}: GameReviewDetailPageProps) {
    const navigate = useNavigate();
    const {id} = useParams()
    const {detailedGameReview, getGameReviewById} = useDetailedGameReview()

    useEffect(() => {
        if (id) {
            getGameReviewById(id)
        }
        //eslint-disable-next-line
    }, [id])

    return (
        <div className="detail">
            <div>
                {detailedGameReview &&
                    <div>
                        <img
                            className="picture"
                            src={detailedGameReview.picture}
                            alt={"Hier sollte ein Bild sein vom Spiel."}/>
                    </div>}
            </div>
            <div>
                {detailedGameReview &&
                    <h2>{detailedGameReview.title}{''}</h2>}
                {detailedGameReview &&
                    <p>{detailedGameReview.headline}{''}</p>}
                {detailedGameReview &&
                    <div>{detailedGameReview.gameDescription}{''}</div>}
            </div>
            <button onClick={() => navigate(`/`)}>Back</button>
            {detailedGameReview &&
                <button onClick={() => {
                    deleteGameReview(detailedGameReview.id)
                    navigate('/')}}>❌</button>}
        </div>

    )
}