import {GameReviewComments} from "../model/GameReviewComments";
import {Rating} from "@mui/material";
import styled from "styled-components/macro";

type UserComentInfoCardProps = {
    userComments: GameReviewComments
}

export default function UserComentInfoCard({userComments}: UserComentInfoCardProps) {

    return (
        <WrapperCommentCard>
            <UserComment>{userComments.comment}</UserComment>
            <Rating value={userComments.commentRating}/>
        </WrapperCommentCard>
    )
}

const WrapperCommentCard = styled.div`
  border-radius: 8px;
  background-color: #478a78;
  margin-bottom: 5px;
  padding-left: 5px;
`
const UserComment = styled.p`
  margin-bottom: 2px;
  padding-top: 2px;
`

