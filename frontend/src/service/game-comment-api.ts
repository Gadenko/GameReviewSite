import axios from "axios";
import {GameReviewComments} from "../model/GameReviewComments";

export function getAllUserComments(token?: string) {
    return axios.get("/api/comments", token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}

export const postNewUserComment: (newUserComment: Omit<GameReviewComments, "id">, token?: string) => Promise<GameReviewComments> = (newUserComment, token) => {
    return axios.post("/api/comments", newUserComment, token
        ? {headers: {"Authorization": token}}
        : {})
        .then(response => response.data)
}
