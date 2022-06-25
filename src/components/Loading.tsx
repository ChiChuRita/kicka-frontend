import React from "react";
import KickaLogo from "./KickaLogo";

const logo = require("../assets/kicka.svg").default;

const Loading = () => {
    return (
        <div className="animate-pulse">
            <KickaLogo />
        </div>
    );
};

export default Loading;
