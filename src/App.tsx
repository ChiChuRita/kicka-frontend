import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import HomePage from "./routes/home/HomePage";
import RankingPage from "./routes/ranking/RankingPage";
import LoginPage from "./routes/auth/LoginPage";
import AuthPage from "./routes/auth/AuthPage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="ranking" element={<RankingPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="play" element={<div>Play</div>} />
                    </Route>
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
