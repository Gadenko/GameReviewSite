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
                            alt={"https://www.google.de/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fde%2Fimages%2Fbaustelle-im-internet%2F171033343&psig=AOvVaw1jdncBwykP1lK_8eJBRd0J&ust=1653381719340000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNCR8IOd9fcCFQAAAAAdAAAAABAD"}/>
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
                    navigate('/')
                }}>❌</button>}

        </div>

    )
}