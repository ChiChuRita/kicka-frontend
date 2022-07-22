import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { QueryClientProvider, QueryClient } from "react-query";

import App from "./App";

import "./index.sass";
import { AuthProvider } from "./context/AuthContext";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost";

axios.interceptors.response.use(
    (res) => res,
    (error) => {
        if (
            error.response.status === 400 &&
            error.response.data.error === "bad token"
        ) {
            localStorage.removeItem("token");
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
