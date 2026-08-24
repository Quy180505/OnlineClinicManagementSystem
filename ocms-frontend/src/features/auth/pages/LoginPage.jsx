import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-8 col-lg-6">

                    <div className="card shadow-sm border-0">

                        <div className="card-body p-4 p-md-5">

                            <h1 className="text-center fw-bold mb-3">
                                Đăng nhập hệ thống
                            </h1>

                            <p className="text-center text-secondary mb-4">
                                Vui lòng chọn loại tài khoản để đăng nhập
                            </p>

                            <div className="d-grid gap-3">

                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg"
                                    onClick={() =>
                                        navigate("/login/patient")
                                    }
                                >
                                    Đăng nhập bệnh nhân
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outline-primary btn-lg"
                                    onClick={() =>
                                        navigate("/login/staff")
                                    }
                                >
                                    Đăng nhập nhân viên hệ thống
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default LoginPage;