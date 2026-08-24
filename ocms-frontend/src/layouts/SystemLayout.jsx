import { Outlet, Link } from "react-router-dom";

const SystemLayout = () => {
    return (
        <div className="system-layout d-flex flex-column min-vh-100">

            <header className="system-header">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container">

                        <Link
                            to="/"
                            className="navbar-brand fw-bold"
                        >
                            OCMS
                        </Link>

                        <div className="d-flex gap-2">

                            <Link
                                to="/login"
                                className="btn btn-outline-light"
                            >
                                Đăng nhập
                            </Link>

                            <Link
                                to="/register"
                                className="btn btn-light"
                            >
                                Đăng ký
                            </Link>

                        </div>
                    </div>
                </nav>
            </header>


            <main className="flex-grow-1">
                <Outlet />
            </main>

            <footer className="system-footer">
                <div className="container text-center">
                    <p className="mb-0">
                        © 2026 Online Clinic Management System
                    </p>
                </div>
            </footer>

        </div>
    );
};

export default SystemLayout;