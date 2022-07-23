import React from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import arrowIcon from "../../assets/arrow.svg";

interface GameEntryProps {
    gameData: GameData;
    username: string;
}

const GameEntry: React.FC<GameEntryProps> = ({ gameData, username }) => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation(
        (confirm: boolean) => {
            return axios.post("/private/game/single/ack", null, {
                params: { game_id: gameData.id, ack: confirm },
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("games");
                queryClient.invalidateQueries("user");
            },
        }
    );

    const isDraftByUser = gameData.is_draft && gameData.user_name1 === username;

    return (
        <div className="flex flex-col gap-2 bg-neutral-800 rounded-xl p-5">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <h2>{gameData.user_name1}</h2>
                    <EloDisplay
                        elo={gameData.elo_user1}
                        elo_change={gameData.elo_change1}
                    />
                </div>
                {gameData.is_draft ? (
                    <span>Draft</span>
                ) : (
                    <div>{gameData.time_started}</div>
                )}
            </div>
            <div className="flex flex-row justify-center bg-neutral-700 rounded-xl py-2">
                <h2>
                    {gameData.score1} : {gameData.score2}
                </h2>
            </div>
            <div className="flex flex-row justify-between items-end">
                <div className="flex flex-col">
                    <h2>{gameData.user_name2}</h2>
                    <EloDisplay
                        elo={gameData.elo_user2}
                        elo_change={gameData.elo_change2}
                    />
                </div>
                {!isDraftByUser ? (
                    <div className="flex flex-row gap-2">
                        <button className="button bg-primary-action h-2">
                            Discard
                        </button>
                        <button className="button bg-green-500 h-2">
                            Confirm
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

interface EloDisplayProps {
    elo: number;
    elo_change: number;
}
const EloDisplay: React.FC<EloDisplayProps> = ({ elo, elo_change }) => {
    const isPostive = elo_change >= 0;

    return (
        <div className="flex flex-row items-center gap-1">
            <span className="text-2xl mr-2">{elo}</span>
            <img
                src={arrowIcon}
                className={isPostive ? "rotate-0" : "rotate-180"}
            />
            <span>{Math.abs(elo_change)}</span>
        </div>
    );
};

export default GameEntry;
