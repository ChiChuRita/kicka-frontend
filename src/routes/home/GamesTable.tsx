import React from "react";
import { Link } from "react-router-dom";
import GameTableElement from "./GameTableElement";
import Info from "../../components/Info";

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
                    <button className="button bg-primary-action shadow-primary">
                        Create Game
                    </button>
                </Link>
            </div>
            <div className="flex flex-col overflow-y-auto">
                {!gamesData.games && (
                    <Info>
                        <p>
                            To compete against other players, select "Create
                            Game"! After the game, you can see your and others'
                            achievements in the Rankings page, located at the
                            bottom left of the screen.
                        </p>
                        <br />
                        <p>Go ahead and create your first game!</p>
                    </Info>
                )}
                {gamesData.games?.map((game, index) => (
                    <GameTableElement
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
