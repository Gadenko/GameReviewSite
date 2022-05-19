import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import useGameReview from "./hook/useGameReview";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import GameReviewOverview from "./components/GameReviewOverview";

export default function App() {

    const {gameReviews, addNewGameReview, deleteGameReview} = useGameReview();

    return (
        <div>
            <BrowserRouter>
                <ToastContainer/>
                <Routes>
                    <Route path="/"
                           element={<GameReviewOverview
                               gameReviews={gameReviews}
                               addNewGameReview={addNewGameReview}
                               deleteGameReview={deleteGameReview}/>}/>

                </Routes>
            </BrowserRouter>
        </div>
    );
}
