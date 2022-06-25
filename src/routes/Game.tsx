import { useParams } from "react-router-dom";

const Game = () => {
    const { gameID } = useParams();
    return <div>Game {gameID}</div>;
};

export default Game;
