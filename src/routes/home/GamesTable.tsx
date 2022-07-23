import React from "react";
import { Link } from "react-router-dom";
import GameEntry from "./GameEntry";

interface GameTableProps {
    gameData: GameData[];
}

const GameTable: React.FC<GameTableProps> = ({ gameData }) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center pb-4">
                <h1>Games</h1>
                <Link to="play">
                    <button className="button bg-primary-action">
                        Create Game
                    </button>
                </Link>
            </div>
            <div className="flex flex-col gap-3">
                {gameData.map((game, index) => (
                    <GameEntry key={index} gameData={game} />
                ))}
            </div>
        </div>
    );
};

export default GameTable;
