import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import useAuth from "../hooks/useAuth";

type User = {
    username: string;
    email: string;
};

const Profile = () => {
    const { auth, loading } = useAuth();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (loading) {
            return;
        } else {
            axios
                .get(`${baseUrl}/users/${auth.userId}`, {
                    headers: { Authorization: "Bearer " + auth.accessToken },
                    withCredentials: true,
                })
                .then((response) => {
                    console.log(response.data);
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error(error.response);
                });
        }
    }, [loading, auth]);

    return (
        <div>
            <h1>Profile</h1>
            <p>{user?.username}</p>
            <p>{user?.email}</p>
        </div>
    );
};

export default Profile;
