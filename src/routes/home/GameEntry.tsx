import React from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import pArrowIcon from "../../assets/arrow_positive.svg";
import nArrowIcon from "../../assets/arrow_negative.svg";

interface GameEntryProps {
    gameData: GameData;
    username: string;
}

TimeAgo.addDefaultLocale(en);
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

    let isDraftByUser = gameData.is_draft && gameData.user_name1 === username;

    isDraftByUser = false;
    return (
        <div className="flex flex-col gap-2 bg-primary-bg rounded-xl p-5 mb-5">
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
                    <div>
                        {new TimeAgo("en-US").format(
                            new Date(parseInt(gameData.time_started))
                        )}
                    </div>
                )}
            </div>
            <div className="flex flex-row justify-center bg-primary-bg rounded-xl py-2">
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
                {gameData.is_draft && !isDraftByUser ? (
                    <div className="flex flex-row gap-2">
                        <button
                            className="button bg-primary-action h-2 shadow-primary"
                            onClick={() => mutate(false)}
                        >
                            Discard
                        </button>
                        <button
                            className="button h-2 bg-green-500 shadow-secondary shadow-green-500/60"
                            onClick={() => mutate(true)}
                        >
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
    const isPostive = elo_change > 0;

    return (
        <div className="flex flex-row items-center gap-[2px]">
            <span className="mr-1">{elo}</span>
            <img
                src={isPostive ? pArrowIcon : nArrowIcon}
                className={
                    isPostive ? "drop-shadow-secondary" : "drop-shadow-primary"
                }
            />
            <span
                className={
                    isPostive
                        ? "text-secondary-action drop-shadow-secondary"
                        : "text-primary-action drop-shadow-primary"
                }
            >
                {Math.abs(elo_change)}
            </span>
        </div>
    );
};

export default GameEntry;
