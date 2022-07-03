import { Outlet } from "react-router-dom";
import NavButton from "./components/NavButton";
import { ReactComponent as RankingIcon } from "./assets/ranking_icon.svg";
import { ReactComponent as SettingIcon } from "./assets/settings_icon.svg";

const AppLayout: React.FC = () => {
    return (
        <div className="flex flex-col justify-between md:max-w-2xl container bg-black">
            <div className="h-max px-8 py-16">
                <Outlet />
            </div>
            <div className="container flex justify-center gap-5 bg-neutral-800 p-4 rounded-t-3xl">
                <NavButton to="ranking">
                    <RankingIcon />
                </NavButton>
                <NavButton to="play">Play</NavButton>
                <NavButton to="">
                    <SettingIcon />
                </NavButton>
            </div>
        </div>
    );
};

export default AppLayout;
