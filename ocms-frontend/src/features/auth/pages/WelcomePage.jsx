import { Link } from "react-router-dom";

const WelcomePage = () => {
    return (
        <section className="welcome-page d-flex align-items-center">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-8 text-center">

                        <div className="welcome-content">

                            <div className="mb-4">
                                <span className="badge bg-primary px-3 py-2">
                                    OCMS
                                </span>
                            </div>

                            <h1 className="display-4 fw-bold mb-4">
                                Chào mừng bạn đến với
                                <br />
                                <span className="text-primary">
                                    Online Clinic Management System
                                </span>
                            </h1>

                            <p className="lead text-secondary mb-5">
                                Hệ thống quản lý phòng khám đa khoa
                                trực tuyến
                            </p>

                            <div className="d-flex justify-content-center gap-3">

                                <Link
                                    to="/login"
                                    className="btn btn-primary btn-lg px-4"
                                >
                                    Đăng nhập
                                </Link>

                                <Link
                                    to="/register"
                                    className="btn btn-outline-primary btn-lg px-4"
                                >
                                    Đăng ký
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default WelcomePage;