import eloLogo from "../../assets/elo.svg";
import trophy from "../../assets/trophy.svg";
import trophy_silver from "../../assets/trophy_silver.svg";
import trophy_bronze from "../../assets/trophy_bronze.svg";
import { motion, Variants } from "framer-motion";

interface RankingProps {
    rankingElement: RankingElementData;
}

const rankingVariants: Variants = {
    offscreen: {
        y: 100,
    },
    onscreen: {
        y: 0,
    },
};

const RankingElement: React.FC<RankingProps> = ({ rankingElement }) => {
    return (
        <motion.div
            className="flex flex-row rounded-xl py-2 px-4 my-3 bg-primary-bg justify-between"
            initial="offscreen"
            whileInView="onscreen"
            variants={rankingVariants}
        >
            <div className="flex items-center">
                <div className="rank pr-2 text-xl">
                    {rankingElement.ranking == 1 && (
                        <img src={trophy} className="drop-shadow-gold" />
                    )}
                    {rankingElement.ranking == 2 && (
                        <img
                            src={trophy_silver}
                            className="drop-shadow-silver"
                        />
                    )}
                    {rankingElement.ranking == 3 && (
                        <img
                            src={trophy_bronze}
                            className="drop-shadow-bronze"
                        />
                    )}
                    {rankingElement.ranking > 3 && rankingElement.ranking + "."}
                </div>
                <div className="username text-xl">
                    {rankingElement.username}
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-row items-center pr-3">
                    <div className="pr-2 text-trophy text-xl font-semibold">
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
        </motion.div>
    );
};

export default RankingElement;
