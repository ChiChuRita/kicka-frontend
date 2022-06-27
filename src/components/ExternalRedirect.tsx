import React from "react";
import { Navigate } from "react-router-dom";

interface ExternalRedirectProps {
    to: string;
}

const ExternalRedirect: React.FC<ExternalRedirectProps> = ({ to }) => {
    window.location.href = to;
    return <Navigate to="/" />;
};

export default ExternalRedirect;
