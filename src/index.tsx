import "./api";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import "./index.sass";

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
