import { Link } from "react-router-dom";
import "../css/components/NavBar.css";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Nav, Navbar } from "react-bootstrap";

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
        <Navbar
            sticky="top"
            bg="light"
            data-bs-theme="light"
            expand="lg"
            id="navbar-wrapper"
        >
            <Nav>
                <Nav.Link as={Link} to="/">
                    Home
                </Nav.Link>
                <Nav.Link as={Link} to="/diary">
                    Diary
                </Nav.Link>
                <Nav.Link as={Link} to="/calendar">
                    Calendar
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                    Profile
                </Nav.Link>

                <Button
                    type="button"
                    onClick={handleLogout}
                    className="pink-button"
                >
                    Logout
                </Button>
            </Nav>
        </Navbar>
    );
};

export default NavBar;
