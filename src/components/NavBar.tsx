import { Link } from "react-router-dom";
import "../css/components/NavBar.css";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
    const { auth, setAuth } = useAuth();

    const handleLogout = () => {
        axios
            .post(
                `${baseUrl}/users/logout/`,
                {},
                {
                    headers: {
                        Authorization: "Bearer " + auth.accessToken,
                    },
                    withCredentials: true,
                }
            )
            .then((response) => {
                console.log(response.data);
                setAuth({
                    userId: null,
                    accessToken: null,
                    isAuthenticated: false,
                });
            })
            .catch((error) => {
                console.error(error.response);
            });
    };

    return (
        <div id="navbar-wrapper">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/diary">Diary</Link>
                </li>
                <li>Calendar</li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li onClick={handleLogout}>
                    <Link to="/login">Logout</Link>
                </li>
            </ul>
        </div>
    );
};

export default NavBar;
