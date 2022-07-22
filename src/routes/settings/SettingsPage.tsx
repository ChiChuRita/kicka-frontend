import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SettingsPage = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const { data } = useQuery(
        "user",
        () => {
            return axios.get<UserData>("/private/user");
        },
        { cacheTime: 0 }
    );

    const onLogout = () => {
        logout();
        navigate("/");
    };

    const onDelete = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="flex flex-col grow gap-5">
            <h1>Settings</h1>
            <button className="button" onClick={onLogout}>
                Logout
            </button>
            <button className="button" onClick={onDelete}>
                Delete Account
            </button>
            <div>
                <span>Username: {data?.data.username}</span>
            </div>
        </div>
    );
};

export default SettingsPage;
