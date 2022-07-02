import "./api";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import axios from "axios";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import "./index.sass";

axios.defaults.url = "localhost:3000";

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnMount: false } },
});

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
