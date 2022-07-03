import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { QueryClientProvider, QueryClient } from "react-query";

import App from "./App";

import "./index.sass";

axios.defaults.baseURL =
    import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>
);
