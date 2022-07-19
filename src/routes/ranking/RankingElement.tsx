import React from "react";

interface RankingProps {
    rankingElement: RankingElementData;
    index: number;
}

const RankingElement = ({ rankingElement, index }: RankingProps) => {
    return (
        <div className="rounded-xl py-2 px-4 my-3 bg-neutral-800">
            {index} {rankingElement.username}
        </div>
    );
};

export default RankingElement;
