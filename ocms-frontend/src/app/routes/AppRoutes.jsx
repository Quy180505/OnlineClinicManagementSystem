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
import PatientProfilePage from "../../features/patient/pages/PatientProfilePage";
import PatientManagementPage from "../../features/staff/pages/PatientManagementPage";
import PatientDetailPage from "../../features/staff/pages/PatientDetailPage";
import SpecialtyDetailPage from "../../features/specialty/pages/SpecialtyDetailPage";
import SpecialtyManagementPage from "../../features/specialty/pages/SpecialtyManagementPage";
import MedicalServiceDetailPage from "../../features/medical-service/pages/MedicalServiceDetailPage";
import MedicalServiceManagementPage from "../../features/medical-service/pages/MedicalServiceManagementPage";
import { ROUTES } from "../../constants/routeConstants";
import DoctorScheduleManagementPage from "../../features/doctor-schedule/pages/DoctorScheduleManagementPage"
import DoctorScheduleDetailPage from "../../features/doctor-schedule/pages/DoctorScheduleDetailPage";
import DoctorScheduleCreatePage from "../../features/doctor-schedule/pages/DoctorScheduleCreatePage";
import AppointmentManagementPage from "../../features/appointment/pages/AppointmentManagementPage";
import AppointmentDetailPage from "../../features/appointment/pages/AppointmentDetailPage";
import AppointmentBookingPage from "../../features/appointment/pages/AppointmentBookingPage";
import MyAppointmentPage from "../../features/appointment/pages/MyAppointmentPage";
import TodayAppointmentsPage from "../../features/medical-record/pages/TodayAppointmentsPage";
import PatientTreatmentHistoryPage from "../../features/medical-record/pages/PatientTreatmentHistoryPage";
import MedicalRecordPage from "../../features/medical-record/pages/MedicalRecordPage";
import LaboratoryPage from "../../features/laboratory/pages/staff/LaboratoryPage";
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

                <Route path={ROUTES.PATIENT.ROOT} element={<PatientLayout />} >
                    <Route  path="profile" element={<PatientProfilePage />} />

                    <Route path="appointments" element={<MyAppointmentPage />}/>

                    <Route path="appointments/book" element={<AppointmentBookingPage />}/>

                    <Route path="appointments/:appointmentId" element={<AppointmentDetailPage />}/>
                
                 </Route>

               <Route  path={ROUTES.STAFF.ROOT}  element={<StaffLayout />}>

                    <Route path="patients"  element={<PatientManagementPage />} />

                    <Route  path="patients/:patientId" element={<PatientDetailPage />} />
                    
                   <Route path="doctor-schedules" element={<DoctorScheduleManagementPage />} />

                    <Route path="doctor-schedules/:doctorScheduleId" element={<DoctorScheduleDetailPage />}/>

                     <Route path="doctor-schedules/create" element={<DoctorScheduleCreatePage />}/>

                     <Route path="appointments" element={<AppointmentManagementPage />}/>

                    <Route path="appointments/:appointmentId" element={<AppointmentDetailPage />}/>

                    <Route path="laboratory" element={<LaboratoryPage />}/>

                </Route>


                <Route path={ROUTES.DOCTOR.ROOT} element={<DoctorLayout />}>

                    <Route path="today"element={<TodayAppointmentsPage />}/>

                    <Route path="today/:appointmentId/treatment-history" element={<PatientTreatmentHistoryPage />}/>

                     <Route path="medical-records/:appointmentId" element={<MedicalRecordPage />}/>

                </Route>

                    <Route path={ROUTES.ADMIN.ROOT}element={<AdminLayout />}>

                        <Route path="users" element={<UserManagementPage />} />

                        <Route path="users/create-doctor" element={<CreateDoctorPage />} />

                        <Route path="users/create-staff"element={<CreateStaffPage />}/>

                        <Route path="specialties" element={<SpecialtyManagementPage />} />

                        <Route path="specialties/:specialtyId"element={<SpecialtyDetailPage />}/>

                        <Route path="medical-services"element={<MedicalServiceManagementPage />}/>

                        <Route  path="medical-services/:medicalServiceId"element={<MedicalServiceDetailPage />}/>
                    </Route>

                </Route>

            </Route>

        </Routes>
    );
};

export default AppRoutes;