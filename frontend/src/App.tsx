import React from 'react';
import {Route, Routes} from "react-router-dom";
import useGameReview from "./hook/useGameReview";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import GameReviewHomePage from "./pages/GameReviewHomePage";
import DetailPage from "./pages/DetailPage";
import AddReviewPage from "./pages/AddReviewPage";

export default function App() {

    const {gameReviews, deleteGameReview, addNewGameReview, saveGameReview} = useGameReview();

    return (
        <div className="APP-Style">
            <ToastContainer/>
            <Header/>
            <Routes>
                <Route path="/"
                       element={<GameReviewHomePage
                           gameReviews={gameReviews}/>}/>
                <Route path={'/gamereview/:id'}
                       element={<DetailPage
                           saveGameReview={saveGameReview}
                           deleteGameReview={deleteGameReview}/>}/>
                <Route path="/addgamereview"
                       element={<AddReviewPage
                           addNewGameReview={addNewGameReview}/>}/>
            </Routes>
        </div>
    );
}
