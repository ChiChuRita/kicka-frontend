import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import RankingTable from "./RankingTable";

const RankingPage = () => {
    const [duo, setDuo] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            <h1>Ranking</h1>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                    <button className="button">Single</button>
                    <button className="button">Duo</button>
                </div>
                <button className="button">
                    <span>Sort by</span>
                </button>
            </div>
            <RankingTable />
        </div>
    );
};

export default RankingPage;
