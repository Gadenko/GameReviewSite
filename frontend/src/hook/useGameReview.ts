import {useContext, useEffect, useState} from "react";
import {GameReview} from "../model/GameReview";
import {getAllGameReviews, postNewGameReview, putGameReview, removeGameReview} from "../service/game-review-api";
import {toast} from "react-toastify";
import {AuthContext} from "../context/AuthProvider";


export default function useGameReview(){
    const [gameReviews, setGameReview] = useState<GameReview[]>([]);
    const {token} = useContext(AuthContext);

    useEffect(() => {
        getAllGameReviews(token)
            .then(allGameReview => setGameReview(allGameReview))
            .catch(() => toast.error("Connection failed! Please retry later."))
    },[token])

    const addNewGameReview = (newGameReview: Omit<GameReview,"id">) => {
        postNewGameReview(newGameReview, token)
            .then(addedGameReview => setGameReview([...gameReviews,addedGameReview]))
            .then(() => {toast.success("GameReview: " + newGameReview.title + " created");})
            .catch(() => toast.error("Connection failed! Please retry later."))
    }

    const deleteGameReview = (id: string) => {
        removeGameReview(id, token)
            .then(()=> setGameReview(gameReviews.filter(gameReview => gameReview.id !==id)))
            .then(() => toast.success("GameReview removed"))
            .catch(() => toast.error("Error while removing GameReview"))
    }

    const saveGameReview = (gameReviewToUpdate: GameReview) => {
        return putGameReview(gameReviewToUpdate, token)
            .then(updatedGameReview => {
                setGameReview(gameReviews.map(review => review.id === updatedGameReview.id? updatedGameReview: review))
                toast.success("GameReview: " + updatedGameReview.title + " updated")
                return updatedGameReview})
            .catch(() => {
                toast.error("Connection failed! Please retry later.")
            })
    }

    return {gameReviews, addNewGameReview, deleteGameReview, saveGameReview}

}
