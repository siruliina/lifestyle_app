import { BrowserRouter, Route, Routes } from "react-router-dom";

// Page and component imports
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <NavBar />
                <Routes>
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Missing />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
