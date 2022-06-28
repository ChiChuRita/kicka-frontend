import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./AppLayout";
import ExternalRedirect from "./components/ExternalRedirect";
import Home from "./routes/home/Home";
import Login from "./routes/auth/Login";
import ProtectedRouter from "./routes/auth/ProtectedRouter";
import Ranking from "./routes/ranking/Ranking";
import { Success } from "./routes/auth/Success";
import Register from "./routes/auth/Register";

const App: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="ranking" element={<Ranking />} />
                <Route path="login" element={<Login />} />
                <Route element={<ProtectedRouter />}>
                    <Route path="play" element={<Home />} />
                </Route>
                <Route
                    path="openid"
                    element={<ExternalRedirect to="https://www.google.de" />}
                />
            </Route>
            <Route path="register" element={<Register />} />
            <Route path="success" element={<Success />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
);

export default App;
