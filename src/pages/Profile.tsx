import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";

type User = {
    username: string;
    email: string;
};

const Profile = () => {
    const { auth, setAuth, loading, setLoading } = useAuth();
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    useEffect(() => {
        if (loading) {
            return;
        } else {
            axiosInstance
                .get(`/users/${auth.userId}/`)
                .then((response) => {
                    console.log(response.data);
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error(error.response);
                });
        }
    }, [loading, auth]);

    const handleDeleteUser = () => {
        axiosInstance
            .post(`/users/logout/`, {})
            .then(() => {
                setLoading(true);
                axiosInstance
                    .delete(`/users/${auth.userId}/`)
                    .catch((error) => {
                        console.error(error.response);
                    });
            })
            .then(() => {
                setAuth({
                    userId: null,
                    accessToken: null,
                    isAuthenticated: false,
                });
                navigate("/login");
            })
            .catch((error) => {
                console.error(error.response);
            });
    };

    return (
        <div>
            <h1>Profile</h1>
            <p>{user?.username}</p>
            <p>{user?.email}</p>
            <button type="button" onClick={handleDeleteUser}>
                Delete Account
            </button>
        </div>
    );
};

export default Profile;
