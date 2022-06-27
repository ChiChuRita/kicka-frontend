import React from "react";
import { Navigate } from "react-router-dom";

// very weird way to redirect to an external link
// but it works (for now)

interface ExternalRedirectProps {
    to: string;
}

const ExternalRedirect: React.FC<ExternalRedirectProps> = ({ to }) => {
    window.location.href = to;
    return <Navigate to="/" />;
};

export default ExternalRedirect;
