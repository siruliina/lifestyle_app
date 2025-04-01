import { Link } from "react-router-dom";
import "../css/components/NavBar.css";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const { setAuth, setLoading } = useAuth();
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const handleLogout = () => {
        axiosInstance
            .post(`/users/logout/`, {})
            .then(() => {
                navigate("/login");
            })
            .then(() => {
                setAuth({
                    userId: null,
                    accessToken: null,
                    isAuthenticated: false,
                });
                setLoading(true);
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

                <button
                    type="button"
                    onClick={handleLogout}
                    className="pink-button"
                >
                    Logout
                </button>
            </ul>
        </div>
    );
};

export default NavBar;
