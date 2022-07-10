import React from "react";

interface RankingProps {
    rankingElement: RankingElementData;
    index: number;
}

const RankingElement = ({ rankingElement, index }: RankingProps) => {
    return <div key={index}>{rankingElement.username}</div>;
};

export default RankingElement;
