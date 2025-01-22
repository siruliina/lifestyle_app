import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// CSS files
import "./css/index.css";
import "./css/buttons.css";
import "./css/forms.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
