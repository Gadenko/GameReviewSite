import {useContext, useEffect, useState} from "react";
import {GameReviewComments} from "../model/GameReviewComments";
import {AuthContext} from "../context/AuthProvider";
import {getAllUserComments, postNewUserComment} from "../service/game-comment-api";
import {toast} from "react-toastify";

export default function useUserComments(){
    const [userComment, setUserComments] = useState<GameReviewComments[]>([]);
    const {token} = useContext(AuthContext);

    useEffect(() => {
        getAllUserComments(token)
            .then(allUserComments => setUserComments(allUserComments))
            .catch(() => toast.error("Connection failed! Please retry later."))

    },[token])

    const addNewUserComment = (newUserComment: Omit<GameReviewComments, "id">) => {
        postNewUserComment(newUserComment, token)
            .then(addedUserComments => setUserComments([...userComment, addedUserComments]))
            .then(() => {toast.success("UserComment created");})
            .catch(() => toast.error("Connection failed! Please retry later."))
    }
    return{userComment, addNewUserComment}
    }
