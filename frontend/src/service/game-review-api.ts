import axios from "axios";
import {GameReview} from "../model/GameReview";

export function getAllGameReviews(){
    return axios.get("/api/gamereview")
        .then(response => response.data)
}

export function getGameReviewBy(id: string){
    return axios.get(`/api/gamereview/${id}`)
        .then(response => response.data)
}

export const postNewGameReview: (newGameReview: Omit<GameReview,"id">) => Promise<GameReview> = (newGameReview) => {
    return axios.post("/api/gamereview", newGameReview)
        .then(response => response.data)
}

export function removeGameReview(id: string){
    return axios.delete(`/api/gamereview/${id}`)
        .then(response => response.data)
}

export const putGameReview: (updatedGameReview: GameReview) => Promise<GameReview> = (updatedGameReview) => {
    return axios.put("/api/gamereview", updatedGameReview)
        .then(reponse => reponse.data)
}