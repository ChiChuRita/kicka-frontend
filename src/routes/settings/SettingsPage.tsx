import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SettingsPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate("/");
    };

    const onDelete = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="flex flex-col gap-5">
            <h1>Settings</h1>
            <button className="button" onClick={onLogout}>
                Logout
            </button>
            <button className="button" onClick={onDelete}>
                Delete Account
            </button>
        </div>
    );
};

export default SettingsPage;
