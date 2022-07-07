import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ModeSelector from "./ModeSelector";

import RankingTable from "./RankingTable";

const RankingPage = () => {
    const [mode, setMode] = useState("single");

    return (
        <div className="flex flex-col gap-4">
            <h1>Rankings</h1>
            <div className="flex flex-row justify-between">
                <ModeSelector
                    mode={mode}
                    onChange={(mode) => {
                        setMode(mode);
                    }}
                />
                <button className="button">
                    <span>Sort by</span>
                </button>
            </div>
            <RankingTable />
        </div>
    );
};

export default RankingPage;
