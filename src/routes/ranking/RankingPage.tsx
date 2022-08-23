import { useState } from "react";
import ModeSelector from "./ModeSelector";

import Info from "../../components/Info";
import RankingTable from "./RankingTable";

const RankingPage = () => {
    const [mode, setMode] = useState("single");

    return (
        <div className="flex flex-col gap-4 grow">
            <h1>Rankings</h1>
            <div className="flex flex-row justify-between">
                <ModeSelector
                    mode={mode}
                    onChange={(mode) => {
                        setMode(mode);
                    }}
                />
            </div>
            {mode === "single" ? (
                <RankingTable />
            ) : (
                <Info>
                    <p>Teams are not available yet.</p>
                </Info>
            )}
        </div>
    );
};

export default RankingPage;
