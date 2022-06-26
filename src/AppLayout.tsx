import { Outlet, NavLink } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="flex flex-col justify-between md:max-w-2xl container bg-neutral-900">
            <div className="h-max p-8">
                <Outlet />
            </div>
            <div className="container flex justify-center gap-5 bg-neutral-800 p-4 rounded-t-3xl">
                <NavLink to="/">
                    <button className="rounded-md text-white bg-neutral-700 p-2">
                        Home
                    </button>
                </NavLink>
                <button className="rounded-md text-white bg-neutral-700 p-2">
                    Play
                </button>
                <NavLink to="/ranking">
                    <button className="rounded-md text-white bg-neutral-700 p-2">
                        Ranking
                    </button>
                </NavLink>
            </div>
        </div>
    );
};

export default AppLayout;
