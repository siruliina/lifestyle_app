import { Link } from "react-router-dom";
import "../css/components/NavBar.css";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const NavBar = () => {
    const { setAuth } = useAuth();
    const axiosInstance = useAxios();

    const handleLogout = () => {
        axiosInstance
            .post(`/users/logout/`, {})
            .then(() => {
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
                <li>
                    <Link to="/calendar">Calendar</Link>
                </li>
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
