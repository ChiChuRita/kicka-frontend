import React from "react";

interface RankingProps {
    rankingElement: RankingElementData;
}

const RankingElement = ({ rankingElement }: RankingProps) => {
    return (
        <div className="flex rounded-xl py-2 px-4 my-3 bg-neutral-700">
            {rankingElement.username}
        </div>
    );
};

export default RankingElement;
