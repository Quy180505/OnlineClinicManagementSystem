import { Routes, Route } from "react-router-dom";
import SystemLayout from "../../layouts/SystemLayout";
import WelcomePage from "../../features/auth/pages/WelcomePage"
import LoginPage from "../../features/auth/pages/LoginPage";
import PatientLoginPage from "../../features/auth/pages/PatientLoginPage";
import StaffLoginPage from "../../features/auth/pages/StaffLoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import OAuth2CallbackPage from "../../features/auth/pages/OAuth2CallbackPage";

const AppRoutes = () => {
    return (
        <Routes>

            <Route element={<SystemLayout />}>

                <Route path="/" element={<WelcomePage />} />

                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/oauth2/callback"
                    element={<OAuth2CallbackPage />}
                />


                <Route
                    path="/login/patient"
                    element={<PatientLoginPage />}
                />

                <Route
                    path="/login/staff"
                    element={<StaffLoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

            </Route>

        </Routes>
    );
};

export default AppRoutes;