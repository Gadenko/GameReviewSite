import React from 'react';
import {Route, Routes} from "react-router-dom";
import useGameReview from "./hook/useGameReview";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import GameReviewHomePage from "./components/GameReviewHomePage";
import DetailPage from "./pages/DetailPage";
import Header from "./components/Header";

export default function App() {

    const {gameReviews, addNewGameReview, deleteGameReview} = useGameReview();


    return (
        <div>
                <ToastContainer/>
                <Header/>
                <Routes>
                    <Route path="/"
                           element={<GameReviewHomePage
                               gameReviews={gameReviews}
                               addNewGameReview={addNewGameReview}/>}/>
                    <Route path={'/gamereview/:id'}
                           element={<DetailPage
                           deleteGameReview={deleteGameReview}/>}/>
                </Routes>
        </div>
    );
}
