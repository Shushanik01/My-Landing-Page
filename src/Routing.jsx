import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import SignIn from "./SignIn";
import Dashboard from "./dashboard";
import SignUp from "./SignUp";

function Routing() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/signUp" />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signUp" element={<SignUp />} />
            </Routes>
        </HashRouter>
    );
}

export default Routing;