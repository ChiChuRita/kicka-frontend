import React from "react";

const logo = require("../assets/kicka.svg").default;

const KickaLogo = () => {
    return (
        <div>
            <img className="w-5/12 my-8" src={logo} alt="logo of kicka" />
        </div>
    );
};

export default KickaLogo;
