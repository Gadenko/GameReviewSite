import axios from "axios";
import {GameReview} from "../model/GameReview";
import {AppUser} from "../modelDto/AppUser";

export function getAllGameReviews(token?: string) {
    return axios.get("/api/gamereview", token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}

export function getGameReviewBy(id: string, token?: string) {
    return axios.get(`/api/gamereview/${id}`, token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}

export const postNewGameReview: (newGameReview: Omit<GameReview, "id">, token?: string) => Promise<GameReview> = (newGameReview, token) => {
    return axios.post("/api/gamereview", newGameReview, token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}

export const removeGameReview: (id: string, token?: string) => Promise<void> = (id: string, token) => {
    return axios.delete(`/api/gamereview/${id}`, token
        ? {headers: {"Authorization": token}}
        : {})
}

export const putGameReview: (updatedGameReview: GameReview, token?: string) => Promise<GameReview> = (updatedGameReview, token) => {
    return axios.put("/api/gamereview", updatedGameReview, token
        ? {headers: {"Authorization": token}}
        : {})
        .then(reponse => reponse.data)
}

export const postNewAppUser: (newAppUser: Omit<AppUser, "id">) => Promise<AppUser> = (newAppUser) => {
    return axios.post("/auth", newAppUser)
        .then(response => response.data)
}
