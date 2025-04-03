import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { Button, Card } from "react-bootstrap";
import { GoGear } from "react-icons/go";

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
            <div className="title-more-row">
                <h1>Profile</h1>
                <Button className="icon-button">
                    <GoGear size="1.2em" />
                </Button>
            </div>
            <Card>
                <Card.Body>
                    <p>{user?.username}</p>
                    <p>{user?.email}</p>
                    <Button
                        type="button"
                        onClick={handleDeleteUser}
                        className="pink-button"
                    >
                        Delete Account
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Profile;
