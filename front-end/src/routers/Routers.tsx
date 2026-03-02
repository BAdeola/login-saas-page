import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoginScreen from "../pages/login-screen/LoginScreen";
import DashBoardPageScreen from "../pages/dashboard-screen/DashBoardPageScreen";

export const Routers = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/dashboards" element={<DashBoardPageScreen />} />
            </Routes>
        </AnimatePresence>
    );
};