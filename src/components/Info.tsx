import React from "react";

interface InfoProps {
    children: React.ReactNode;
}

const Info: React.FC<InfoProps> = ({ children }) => {
    return (
        <div className="flex items-center bg-primary-bg rounded-md">
            <div className="p-5 text-2xl">💡</div>
            <div className="py-8 pr-8">{children}</div>
        </div>
    );
};

export default Info;
