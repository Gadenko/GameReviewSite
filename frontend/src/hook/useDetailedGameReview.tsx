import {useState} from "react";
import {GameReview} from "../model/GameReview";
import {toast} from "react-toastify";
import {getGameReviewBy} from "../service/game-review-api";

export default function useDetailedGameReview(){
    const [detailedGameReview, setDetailedGameReview] = useState<GameReview>()

    const getGameReviewById = (id:string) => {
        getGameReviewBy(id)
            .then(data => setDetailedGameReview(data))
            .catch((error) => toast.error(error))
    }
    return {detailedGameReview, getGameReviewById, setDetailedGameReview}
}