import { AuthProvider } from "../../context/AuthContext";
import RankingElement from "./RankingElement";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";

const RankingTable = () => {
    // temp link to the api for now
    const usersPerQuery = 10;
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
    } = useInfiniteQuery("rankingData", fetchData, {
        getNextPageParam: (lastPage, pages) => {
            return lastPage.lastQuery + 1;
        },
    });

    const loadMoreRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!hasNextPage) return;
        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach(
                    (entry) => entry.isIntersecting && fetchNextPage()
                ),
            { root: null, rootMargin: "0px", threshold: 0.1 }
        );
        const el = loadMoreRef && loadMoreRef.current;

        if (!el) return;
        observer.observe(el);
    }, [loadMoreRef.current, hasNextPage]);

    return status === "loading" ? (
        <p>Loading...</p>
    ) : status === "error" ? (
        <p>Error: {(error as Error).message}</p>
    ) : (
        <div className="scroll-smooth overflow-y-auto grow h-0">
            {data?.pages.map((group, index) => (
                <>
                    {group.ranking.map((rankingElement, rankingIndex) => (
                        <RankingElement
                            rankingElement={rankingElement}
                            key={rankingIndex}
                            index={
                                rankingIndex +
                                (group.lastQuery - 1) * usersPerQuery +
                                1
                            }
                        />
                    ))}
                </>
            ))}
            <div>
                <button
                    ref={loadMoreRef}
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
        </div>
    );
};

export default RankingTable;
