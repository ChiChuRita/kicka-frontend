import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import HomePage from "./routes/home/HomePage";
import RankingPage from "./routes/ranking/RankingPage";
import LoginPage from "./routes/auth/LoginPage";
import AuthPage from "./routes/auth/AuthPage";
import DeubgPage from "./routes/debug/DeubgPage";
import SettingsPage from "./routes/settings/SettingsPage";
import PlayPage from "./routes/play/PlayPage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route index element={<HomePage />} />
                        <Route path="ranking" element={<RankingPage />} />
                        <Route path="play" element={<PlayPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                    </Route>
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/debug" element={<DeubgPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
