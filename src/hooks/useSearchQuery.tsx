import { QueryKey, useQuery } from "react-query";
import axios from "axios";

export type QueryResponse = {
    [key: string]: string;
};

const fetchUsers = async (searchQuery: string): Promise<QueryResponse> => {
    const { data } = await axios.get(
        `https://api.github.com/search/users?q=${searchQuery}&per_page=5`
    );
    return data;
};

const useSearchQuery = (searchQuery: string) => {
    return useQuery<QueryResponse, Error>(
        ["query", searchQuery],
        () => fetchUsers(searchQuery),
        {
            enabled: searchQuery != "",
        }
    );
};

export default useSearchQuery;
