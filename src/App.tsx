import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./AppLayout";
import Home from "./routes/Home";
import Ranking from "./routes/Ranking";

const App: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="ranking" element={<Ranking />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default App;
