import NewGameReview from "../components/NewGameReview";
import {GameReview} from "../model/GameReview";

type AddReaviewPageProps = {
    addNewGameReview: (newGameReview : Omit<GameReview, "id">) => void;
}

export default function AddReviewPage({addNewGameReview}: AddReaviewPageProps){
    return (
        <div>
            <NewGameReview
                addNewGameReview={addNewGameReview}
                    />
        </div>
    )
}