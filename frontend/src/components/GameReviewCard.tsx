import {GameReview} from "../model/GameReview";

type GameReviewCardProps = {
    gameReviews: GameReview
    deleteGameReview: (id: string) => void
}

export default function GameReviewCard({gameReviews, deleteGameReview}: GameReviewCardProps){
    return(
        <div>
            <div>{gameReviews.title}</div>
            <div>{gameReviews.headline}</div>
            <div>{gameReviews.gameDescription}</div>
            <div>
                {deleteGameReview && <button onClick={() => deleteGameReview(gameReviews.id)}> ❌ </button>}
            </div>
        </div>
    )
}