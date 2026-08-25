import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routeConstants";
const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center bg-light py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h1 className="fw-bold text-dark mb-2">
                        Chào mừng bạn đến với <span className="text-primary">Online Clinic</span>
                    </h1>
                    <p className="text-secondary lead">
                        Vui lòng chọn loại tài khoản để truy cập vào hệ thống phù hợp
                    </p>
                </div>

                <div className="row justify-content-center g-4">
                    
                    <div className="col-md-5 col-lg-4">
                        <div 
                            className="card h-100 border-0 shadow-sm text-center p-4 rounded-4 hover-shadow transition-all cursor-pointer"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(ROUTES.AUTH.LOGIN_PATIENT)}
                        >
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h3 className="fw-bold fs-4 text-dark mb-2">Bệnh nhân</h3>
                                    <p className="text-muted small mb-4">
                                        Đặt lịch khám bệnh, theo dõi hồ sơ sức khỏe cá nhân, xem đơn thuốc và nhận tư vấn từ bác sĩ.
                                    </p>
                                </div>
                                <button className="btn btn-primary w-100 py-2 rounded-3 fw-semibold">
                                    Đăng nhập Bệnh nhân
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5 col-lg-4">
                        <div 
                            className="card h-100 border-0 shadow-sm text-center p-4 rounded-4 hover-shadow transition-all cursor-pointer"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(ROUTES.AUTH.LOGIN_STAFF)}
                        >
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h3 className="fw-bold fs-4 text-dark mb-2">Nhân viên & Bác sĩ</h3>
                                    <p className="text-muted small mb-4">
                                        Dành cho Quản trị viên, Bác sĩ và Nhân viên y tế quản lý lịch hẹn, bệnh án và vận hành phòng khám.
                                    </p>
                                </div>
                                <button className="btn btn-outline-success w-100 py-2 rounded-3 fw-semibold">
                                    Đăng nhập Nội bộ
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="text-center mt-5">
                    <button 
                        onClick={() => navigate(ROUTES.ROOT)} 
                        className="btn btn-link text-decoration-none text-secondary"
                    >
                        ← Quay lại trang chủ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
