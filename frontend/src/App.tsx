import React from 'react';
import {Route, Routes} from "react-router-dom";
import useGameReview from "./hook/useGameReview";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import GameReviewHomePage from "./pages/GameReviewHomePage";
import DetailPage from "./pages/DetailPage";
import Header from "./components/Header";
import AddReviewPage from "./pages/AddReviewPage";

export default function App() {

    const {gameReviews, deleteGameReview, addNewGameReview} = useGameReview();


    return (
        <div>
            <ToastContainer/>
            <Header/>
            <Routes>
                <Route path="/"
                       element={<GameReviewHomePage
                           gameReviews={gameReviews}/>}/>
                <Route path={'/gamereview/:id'}
                       element={<DetailPage
                           deleteGameReview={deleteGameReview}/>}/>
                <Route path="/addgamereview"
                       element={<AddReviewPage
                           addNewGameReview={addNewGameReview}/>}/>
            </Routes>
        </div>
    );
}
