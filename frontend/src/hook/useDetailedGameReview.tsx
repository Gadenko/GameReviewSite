import {useContext, useState} from "react";
import {GameReview} from "../model/GameReview";
import {toast} from "react-toastify";
import {getGameReviewBy} from "../service/game-review-api";
import {AuthContext} from "../context/AuthProvider";

export default function useDetailedGameReview(){
    const [detailedGameReview, setDetailedGameReview] = useState<GameReview>();
    const {token} =useContext(AuthContext);

    const getGameReviewById = (id:string) => {
        getGameReviewBy(id, token)
            .then(data => setDetailedGameReview(data))
            .catch((error) => toast.error(error))
    }
    return {detailedGameReview, getGameReviewById, setDetailedGameReview}
}