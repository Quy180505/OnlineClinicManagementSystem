import { useState } from "react";
import LoginForm from "../components/LoginForm";
import GoogleLoginButton from "../components/GoogleLoginButton";

const PatientLoginPage = () => {

        const [oauth2Error] = useState(() => {
        const error = sessionStorage.getItem("oauth2Error");

            if (error) {
                sessionStorage.removeItem("oauth2Error");
            }

            return error;
        });

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-8 col-lg-5">

                    <div className="card shadow-sm border-0">

                        <div className="card-body p-4 p-md-5">

                            <h1 className="text-center fw-bold mb-2">
                                Đăng nhập bệnh nhân
                            </h1>

                            <p className="text-center text-secondary mb-4">
                                Đăng nhập để sử dụng các dịch vụ của phòng khám
                            </p>

                            {oauth2Error && (
                                <div
                                    className="alert alert-warning"
                                    role="alert"
                                >
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {oauth2Error}
                                </div>
                            )}

                            <LoginForm />

                            <div className="d-flex align-items-center my-4">

                                <hr className="flex-grow-1" />

                                <span className="px-3 text-secondary">
                                    Hoặc
                                </span>

                                <hr className="flex-grow-1" />

                            </div>

                            <GoogleLoginButton />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default PatientLoginPage;