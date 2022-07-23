import React from "react";

interface GameEntryProps {
    gameData: GameData;
}

const GameEntry: React.FC<GameEntryProps> = ({ gameData }) => {
    return (
        <div className="flex flex-row justify-between bg-neutral-800 rounded-xl py-2 px-4">
            <span>{gameData.entity_name1}</span>
            <span>{`${gameData.score1} : ${gameData.score2}`}</span>
            <span>{gameData.entity_name2}</span>
        </div>
    );
};

export default GameEntry;
