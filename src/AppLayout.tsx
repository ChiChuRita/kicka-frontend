import React from "react";
import { Outlet, Link } from "react-router-dom";

const AppLayout = () => {
    return (
        <div>
            <Outlet />
            <div className="flex gap-1 shrink justify-center">
                <Link className="text-blue-700" to="/">
                    Home
                </Link>
                <Link className="text-blue-700" to="/ranking">
                    Ranking
                </Link>
            </div>
        </div>
    );
};

export default AppLayout;
