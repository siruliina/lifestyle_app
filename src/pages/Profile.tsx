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
    const { auth, loading } = useAuth();
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

    return (
        <div>
            <div className="title-more-row">
                <h1>Profile</h1>
                <Button
                    className="icon-button"
                    onClick={() => navigate("/settings")}
                >
                    <GoGear size="1.2em" />
                </Button>
            </div>
            <Card>
                <Card.Body>
                    <p>{user?.username}</p>
                    <p>{user?.email}</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Profile;
