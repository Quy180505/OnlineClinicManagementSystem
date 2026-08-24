import LoginForm from "../components/LoginForm";

const StaffLoginPage = () => {
    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-8 col-lg-5">

                    <div className="card shadow-sm border-0">

                        <div className="card-body p-4 p-md-5">

                            <h1 className="text-center fw-bold mb-2">
                                Đăng nhập nhân viên hệ thống
                            </h1>

                            <p className="text-center text-secondary mb-4">
                                Dành cho Admin, Bác sĩ và Nhân viên
                            </p>

                            <LoginForm />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default StaffLoginPage;