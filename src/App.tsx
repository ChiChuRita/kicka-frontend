import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./AppLayout";
import ExternalRedirect from "./components/ExternalRedirect";
import Home from "./routes/Home";
import Login from "./routes/Login";
import ProtectedRouter from "./routes/ProtectedRouter";
import Ranking from "./routes/Ranking";

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
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
);

export default App;
