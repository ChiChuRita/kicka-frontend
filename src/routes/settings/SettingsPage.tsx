import { useState } from "react";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SettingsPage = () => {
    const { token, logout } = useAuth();
    const [deleteModal, setDeleteModal] = useState(false);

    const navigate = useNavigate();

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

    const onCancel = async () => {
        setDeleteModal(false);
    };

    return (
        <div className="flex flex-col grow gap-5">
            <h1>Settings</h1>
            <button className="button" onClick={onLogout}>
                Logout
            </button>
            <button
                className="button bg-primary-action shadow-primary"
                onClick={() => {
                    setDeleteModal(true);
                }}
            >
                Delete Account
            </button>

            {deleteModal && (
                <div className="flex flex-col justify-between bg-primary-bg rounded-md p-6 gap-6">
                    <span className="text-center">
                        Are you sure that you want to delete your Account?
                    </span>
                    <div className="flex flex-row justify-center gap-5">
                        <button className="button" onClick={onCancel}>
                            Cancel
                        </button>
                        <button
                            className="button bg-primary-action shadow-primary"
                            onClick={onDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsPage;
