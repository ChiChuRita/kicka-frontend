import React from "react";

interface GameEntryProps {
    gameData: GameData;
}

const GameEntry: React.FC<GameEntryProps> = ({ gameData }) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between bg-neutral-800 rounded-xl py-4 px-6">
                <span>{gameData.entity_name1}</span>
                <span>{`${gameData.score1} : ${gameData.score2}`}</span>
                <span>{gameData.entity_name2}</span>
            </div>
            <div>
                <button className="button bg-green-400">Confim</button>
                <button className="button bg-primary-action">Discard</button>
            </div>
        </div>
    );
};

export default GameEntry;
