import React from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

interface GameEntryProps {
    gameData: GameData;
}

const GameEntry: React.FC<GameEntryProps> = ({ gameData }) => {
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

    const onConfirm = () => {
        mutate(true);
    };

    const onDiscard = () => {
        mutate(false);
    };

    return (
        <div className="flex flex-col bg-neutral-800 rounded-xl py-4 px-6 gap-5">
            <div className="flex flex-row justify-between">
                <span>{gameData.user_name1}</span>
                <span>{`${gameData.score1} : ${gameData.score2}`}</span>
                <span>{gameData.user_name2}</span>
            </div>
            {!!gameData.is_draft && (
                <div className="flex flex-row justify-end items-center gap-5">
                    <button className="button bg-green-500" onClick={onConfirm}>
                        Confim
                    </button>
                    <button
                        className="button bg-primary-action"
                        onClick={onDiscard}
                    >
                        Discard
                    </button>
                    <span>Draft</span>
                </div>
            )}
        </div>
    );
};

export default GameEntry;
