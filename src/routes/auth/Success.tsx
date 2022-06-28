import { Navigate, useSearchParams } from "react-router-dom";

export const Success = () => {
    const [searchParams] = useSearchParams();
    console.log(searchParams.get("token"));
    //set authentication and token
    return <Navigate to="home" />;
};
