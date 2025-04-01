import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// CSS files
import "./css/general/index.css";
import "./css/general/buttons.css";
import "./css/general/forms.css";
import "./css/general/modals.css";
import "./css/general/layouts.css";

import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
