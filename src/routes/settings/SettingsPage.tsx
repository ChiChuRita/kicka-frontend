import { useState } from "react";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SettingsPage = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const [deleteModel, setDeleteModel] = useState(false);
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
            <button
                className="button bg-primary-action"
                onClick={() => {
                    setDeleteModel(true);
                }}
            >
                Delete Account
            </button>
            {data ? (
                <div>
                    <span>Username: {data.data.username}</span>
                </div>
            ) : (
                <div>Loading...</div>
            )}
            {deleteModel && (
                <div className="flex flex-row items-center justify-between bg-neutral-800 rounded-md p-6">
                    <span>
                        Are you sure that you want to delete your Account?
                    </span>
                    <button
                        className="button bg-primary-action"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default SettingsPage;
