import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { fetchCallback } from "../../api";

const Callback = () => {
    const [searchParams] = useSearchParams();

    const { data, isLoading, error } = useQuery("callback", () =>
        fetchCallback(searchParams.get("code")!, searchParams.get("state")!)
    );
    return <div>{data?.token}</div>;
};

export default Callback;
