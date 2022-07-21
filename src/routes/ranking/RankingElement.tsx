import React from "react";
import eloLogo from "../../assets/elo.svg";

interface RankingProps {
    rankingElement: RankingElementData;
    index: number;
}

const RankingElement = ({ rankingElement, index }: RankingProps) => {
    return (
        <div className="flex flex-row rounded-xl py-2 px-4 my-3 bg-neutral-800 justify-between">
            <div className="flex items-center">
                <div className="rank pr-2 text-xl">{index}.</div>
                <div className="username text-xl">
                    {rankingElement.username}
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-row items-center pr-3">
                    <div className="pr-2 text-yellow-300 text-xl font-semibold">
                        {rankingElement.elo}
                    </div>
                    <img src={eloLogo} className="h-6" />
                </div>
                <div className="w-20 flex flex-col text-sm items-end">
                    <span>{rankingElement.games} Games</span>
                    <span className="text-green-400">
                        {rankingElement.wins} Wins
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RankingElement;
