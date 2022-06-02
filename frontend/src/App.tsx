import React from 'react';
import {Route, Routes} from "react-router-dom";
import useGameReview from "./hook/useGameReview";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import GameReviewHomePage from "./pages/GameReviewHomePage";
import DetailPage from "./pages/DetailPage";
import AddReviewPage from "./pages/AddReviewPage";
import "./css/APP.css"
import RequireAuth from "./routing/RequireAuth";
import LoginPage from "./pages/LoginPage";
import RegistrierungsPage from "./pages/RegistrierungsPage";
import useAppUser from "./hook/useAppUser";

export default function App() {

    const {gameReviews, deleteGameReview, addNewGameReview, saveGameReview} = useGameReview();
    const {addNewAppUser} = useAppUser();

    return (
        <div>
            <ToastContainer/>
            <Header/>
            <Routes>
                <Route path="/"
                       element={<GameReviewHomePage
                           gameReviews={gameReviews}/>}/>
                <Route path="/gamereview/registration"
                       element={<RegistrierungsPage
                           addNewAppUser={addNewAppUser}/>}/>
                <Route element={<RequireAuth/>}>
                    <Route path={'/gamereview/:id'}
                           element={<DetailPage
                               saveGameReview={saveGameReview}
                               deleteGameReview={deleteGameReview}/>}/>
                    <Route path="/addgamereview"
                           element={<AddReviewPage
                               addNewGameReview={addNewGameReview}
                           />}/>
                </Route>
                <Route path={'/login'} element={<LoginPage/>}/>
            </Routes>
        </div>
    );
}
