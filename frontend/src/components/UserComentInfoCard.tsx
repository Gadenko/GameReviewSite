import {GameReviewComments} from "../model/GameReviewComments";
import {Rating} from "@mui/material";

type UserComentInfoCardProps = {
    userComments: GameReviewComments
}

export default function UserComentInfoCard({userComments}: UserComentInfoCardProps){

    return(
        <div>
            <p>{userComments.comment}</p>
            <Rating value={userComments.commentRating}/>
        </div>
    )
}
