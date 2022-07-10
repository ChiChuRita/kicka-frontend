import { AuthProvider } from "../../context/AuthContext";
import RankingElement from "./RankingElement";
import { useState } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";

const RankingTable = () => {
    // temp link to the api for now
    const apiLink =
        "https://randomuser.me/api/?results=10&seed=dc1b6de4a7bb98a7&page=";
    const fetchData = ({ pageParam = 1 }): Promise<RankingData> => {
        return axios.get(apiLink + pageParam).then((res) => {
            const data = res.data.results.map((user: any) => {
                return {
                    username: user.name.first,
                    elo: user.location.street.number,
                    ranking: user.location.street.number,
                    games: user.location.street.number,
                    wins: user.location.street.number,
                } as RankingElementData;
            });
            return { ranking: data, lastQuery: pageParam } as RankingData;
        });
    };
    const {
        data,
        fetchNextPage,
        error,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery(["rankingData"], fetchData, {
        getNextPageParam: (lastPage, pages) => {
            return lastPage.lastQuery + 1;
        },
    });

    return status === "loading" ? (
        <p>Loading...</p>
    ) : status === "error" ? (
        <p>Error: {(error as Error).message}</p>
    ) : (
        <>
            {data?.pages.map((group, index) => (
                <div key={index}>
                    {group.ranking.map((rankingElement, rankingIndex) => (
                        <RankingElement
                            rankingElement={rankingElement}
                            key={rankingIndex}
                        />
                    ))}
                </div>
            ))}
            <div>
                <button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? "Loading more..."
                        : hasNextPage
                        ? "Load More"
                        : "Nothing more to load"}
                </button>
            </div>
            <div>
                {isFetching && !isFetchingNextPage ? "Fetching..." : null}
            </div>
        </>
    );
};

export default RankingTable;
