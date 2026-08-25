import { Routes, Route } from "react-router-dom";
import SystemLayout from "../../layouts/SystemLayout";
import PatientLayout from "../../layouts/PatientLayout";
import StaffLayout from "../../layouts/StaffLayout";
import DoctorLayout from "../../layouts/DoctorLayout";
import AdminLayout from "../../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import WelcomePage from "../../features/auth/pages/WelcomePage";
import LoginPage from "../../features/auth/pages/LoginPage";
import PatientLoginPage from "../../features/auth/pages/PatientLoginPage";
import StaffLoginPage from "../../features/auth/pages/StaffLoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import OAuth2CallbackPage from "../../features/auth/pages/OAuth2CallbackPage";
import UserManagementPage from "../../features/user/pages/UserManagementPage";
import CreateDoctorPage from "../../features/user/pages/CreateDoctorPage";
import CreateStaffPage from "../../features/user/pages/CreateStaffPage";

import { ROUTES } from "../../constants/routeConstants";

const AppRoutes = () => {
    return (
        <Routes>

            <Route element={<SystemLayout />}>


                <Route
                    path={ROUTES.ROOT}
                    element={<WelcomePage />}
                />

                <Route
                    path={ROUTES.AUTH.LOGIN}
                    element={<LoginPage />}
                />

                <Route
                    path={ROUTES.AUTH.OAUTH2_CALLBACK}
                    element={<OAuth2CallbackPage />}
                />

                <Route
                    path={ROUTES.AUTH.LOGIN_PATIENT}
                    element={<PatientLoginPage />}
                />

                <Route
                    path={ROUTES.AUTH.LOGIN_STAFF}
                    element={<StaffLoginPage />}
                />

                <Route
                    path={ROUTES.AUTH.REGISTER}
                    element={<RegisterPage />}
                />

                <Route element={<ProtectedRoute />}>

                    <Route
                        path={ROUTES.PATIENT.ROOT}
                        element={<PatientLayout />}
                    />

                    <Route
                        path={ROUTES.STAFF.ROOT}
                        element={<StaffLayout />}
                    />

                    <Route
                        path={ROUTES.DOCTOR.ROOT}
                        element={<DoctorLayout />}
                    />

                    <Route
                        path={ROUTES.ADMIN.ROOT}
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