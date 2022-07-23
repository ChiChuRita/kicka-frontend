import React from "react";
import { Link } from "react-router-dom";
import GameEntry from "./GameEntry";

interface GameTableProps {
    gamesData: GamesData;
    username: string;
}

const GameTable: React.FC<GameTableProps> = ({ gamesData, username }) => {
    return (
        <div className="flex flex-col h-1 grow">
            <div className="flex flex-row justify-between items-center pb-4">
                <h1>Games</h1>
                <Link to="play">
                    <button className="button bg-primary-action">
                        Create Game
                    </button>
                </Link>
            </div>
            <div className="flex flex-col gap-5 overflow-y-scroll">
                {gamesData.games?.map((game, index) => (
                    <GameEntry
                        key={index}
                        gameData={game}
                        username={username}
                    />
                ))}
            </div>
        </div>
    );
};

export default GameTable;
