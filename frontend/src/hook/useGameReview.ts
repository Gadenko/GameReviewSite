import {useEffect, useState} from "react";
import {GameReview} from "../model/GameReview";
import {getAllGameReviews, postNewGameReview, putGameReview, removeGameReview} from "../service/game-review-api";
import {toast} from "react-toastify";


export default function useGameReview(){
    const [gameReviews, setGameReview] = useState<GameReview[]>([]);

    useEffect(() => {
        getAllGameReviews()
            .then(allGameReview => setGameReview(allGameReview))
            .catch(() => toast.error("Connection failed! Please retry later."))
    },[])

    const addNewGameReview = (newGameReview: Omit<GameReview,"id">) => {
        postNewGameReview(newGameReview)
            .then(addedGameReview => setGameReview([...gameReviews,addedGameReview]))
            .then(() => {toast.success("GameReview: " + newGameReview.title + " created");})
            .catch(() => toast.error("Connection failed! Please retry later."))
    }

    const deleteGameReview = (id: string) => {
        removeGameReview(id)
            .then(()=> setGameReview(gameReviews.filter(gameReview => gameReview.id !==id)))
            .then(() => toast.success("GameReview removed"))
            .catch(() => toast.error("Error while removing GameReview"))
    }

    const saveGameReview = (gameReviewToUpdate: GameReview) => {
        return putGameReview(gameReviewToUpdate)
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