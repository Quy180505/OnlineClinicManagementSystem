import { Routes, Route } from "react-router-dom";
import SystemLayout from "../../layouts/SystemLayout";
import WelcomePage from "../../features/auth/pages/WelcomePage";
import LoginPage from "../../features/auth/pages/LoginPage";
import PatientLoginPage from "../../features/auth/pages/PatientLoginPage";
import StaffLoginPage from "../../features/auth/pages/StaffLoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import OAuth2CallbackPage from "../../features/auth/pages/OAuth2CallbackPage";
import PatientLayout from "../../layouts/PatientLayout";
import StaffLayout from "../../layouts/StaffLayout";
import DoctorLayout from "../../layouts/DoctorLayout";
import AdminLayout from "../../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import UserManagementPage from "../../features/user/pages/UserManagementPage";
import CreateDoctorPage from "../../features/user/pages/CreateDoctorPage";
import CreateStaffPage from "../../features/user/pages/CreateStaffPage";

const AppRoutes = () => {
    return (
        <Routes>

            <Route element={<SystemLayout />}>


                <Route
                    path="/"
                    element={<WelcomePage />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

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


               

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/patient"
                        element={<PatientLayout />}
                    />

    
                    <Route
                        path="/staff"
                        element={<StaffLayout />}
                    />

                  
                    <Route
                        path="/doctor"
                        element={<DoctorLayout />}
                    />

                    <Route
                        path="/admin"
                        element={<AdminLayout />}
                    >

                        <Route
                            path="users"
                            element={<UserManagementPage />}
                        />

                        <Route
                            path="users/create-doctor"
                            element={<CreateDoctorPage />}
                        />

                        <Route
                            path="users/create-staff"
                            element={<CreateStaffPage />}
                        />



                    </Route>

                </Route>

            </Route>

        </Routes>
    );
};

export default AppRoutes;