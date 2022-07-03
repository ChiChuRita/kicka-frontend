import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./AppLayout";
import HomePage from "./routes/home/HomePage";
import RankingPage from "./routes/ranking/RankingPage";
import LoginPage from "./routes/auth/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="ranking" element={<RankingPage />} />
                    <Route path="login" element={<LoginPage />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="play" element={<div>Play</div>} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
