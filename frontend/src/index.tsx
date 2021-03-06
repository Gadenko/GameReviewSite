import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from "react-router-dom";
import AuthProvider from "./context/AuthProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <HashRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </HashRouter>
    </React.StrictMode>
);
reportWebVitals();
