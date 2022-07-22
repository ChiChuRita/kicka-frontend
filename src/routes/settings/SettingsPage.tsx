import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SettingsPage = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const { data, isLoading } = useQuery("user", () => {
        return axios.get<UserData>("/private/user");
    });

    const { mutateAsync } = useMutation(() => {
        return axios.delete("/private/user");
    });

    const onLogout = () => {
        logout();
        navigate("/");
    };

    const onDelete = async () => {
        await mutateAsync();
        logout();
        navigate("/");
    };

    return (
        <div className="flex flex-col grow gap-5">
            <h1>Settings</h1>
            <button className="button" onClick={onLogout}>
                Logout
            </button>
            <button className="button bg-primary-action" onClick={onDelete}>
                Delete Account
            </button>
            {!isLoading ? (
                <div>
                    <span>Username: {data?.data.username}</span>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default SettingsPage;
