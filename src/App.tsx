import { BrowserRouter, Route, Routes } from "react-router-dom";

// Page and component imports
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Missing from "./pages/Missing";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Missing />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
