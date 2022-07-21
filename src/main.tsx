import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { QueryClientProvider, QueryClient } from "react-query";

import App from "./App";

import "./index.sass";
import { AuthProvider } from "./context/AuthContext";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost";

console.log(import.meta.env.VITE_API_URL);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </AuthProvider>
    </React.StrictMode>
);
