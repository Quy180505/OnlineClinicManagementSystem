import { Link } from "react-router-dom";

const WelcomePage = () => {
    return (
        <section className="welcome-page d-flex align-items-center py-5" style={{ minHeight: "100vh" }}>
            <div className="container">
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-8 text-center">
                        <div className="welcome-content">
                            <span className="text-uppercase text-muted fw-bold tracking-wider mb-2 d-block">
                                🏥 Chăm sóc tận tâm - Trọn vẹn niềm tin
                            </span>
                            <h1 className="display-4 fw-bold text-primary mb-3">
                                Hệ thống Quản lý Phòng khám Online
                            </h1>
                            <p className="lead text-secondary max-w-2xl mx-auto mb-4">
                                Giải pháp kết nối bệnh nhân và bác sĩ nhanh chóng. Đặt lịch khám, 
                                quản lý hồ sơ sức khỏe và nhận tư vấn y tế trực tuyến mọi lúc, mọi nơi.
                            </p>
                            <p className="fw-semibold text-dark mb-4">
                                Vui lòng đăng nhập hoặc tạo tài khoản để trải nghiệm đầy đủ dịch vụ
                            </p>
                            <div className="d-flex justify-content-center gap-3">
                                <Link to="/login" className="btn btn-primary btn-lg px-4 shadow-sm">
                                    Đăng nhập
                                </Link>
                                <Link to="/register" className="btn btn-outline-primary btn-lg px-4">
                                    Đăng ký tài khoản
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4 justify-content-center mt-4">
                    <div className="col-md-4 col-sm-6">
                        <div className="card h-100 border-0 shadow-sm text-center p-4 bg-light">
                            <div className="fs-1 text-primary mb-2">📅</div>
                            <h5 className="fw-bold">Đặt lịch nhanh chóng</h5>
                            <p className="text-muted small mb-0">Chủ động chọn lịch khám với bác sĩ chuyên khoa phù hợp.</p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="card h-100 border-0 shadow-sm text-center p-4 bg-light">
                            <div className="fs-1 text-primary mb-2">📄</div>
                            <h5 className="fw-bold">Hồ sơ bệnh án điện tử</h5>
                            <p className="text-muted small mb-0">Lưu trữ lịch sử khám và đơn thuốc an toàn, bảo mật tuyệt đối.</p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="card h-100 border-0 shadow-sm text-center p-4 bg-light">
                            <div className="fs-1 text-primary mb-2">🩺</div>
                            <h5 className="fw-bold">Đội ngũ bác sĩ uy tín</h5>
                            <p className="text-muted small mb-0">Kết nối trực tiếp với các chuyên gia y tế giàu kinh nghiệm.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WelcomePage;
