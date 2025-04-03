import { Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth";

// Page and component imports
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import NavBar from "./components/NavBar";
import Diary from "./pages/Diary";
import FrontPage from "./pages/FrontPage";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";

function App() {
    const { auth } = useAuth();

    return (
        <div>
            {auth.isAuthenticated ? <NavBar /> : null}
            <div id="content">
                <Routes>
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<FrontPage />} />
                    <Route path="/diary" element={<Diary />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Missing />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
