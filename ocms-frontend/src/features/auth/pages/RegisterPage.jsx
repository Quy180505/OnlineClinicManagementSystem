import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-9 col-lg-7">

                    <div className="card shadow-sm border-0">

                        <div className="card-body p-4 p-md-5">

                            <h1 className="text-center fw-bold mb-4">
                                Đăng ký tài khoản bệnh nhân
                            </h1>

                            <RegisterForm />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default RegisterPage;