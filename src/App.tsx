import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./AppLayout";
import Loading from "./components/Loading";
import Home from "./routes/Home";
import Ranking from "./routes/Ranking";

const App: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="ranking" element={<Ranking />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
);

export default App;
