import { NavLink, Outlet } from 'react-router-dom';
import { useAuthContext } from '../features/auth/hooks/useAuthContext';


const navItems = [
    { label: 'Trang chủ', to: '/patient' },
    { label: 'Đặt lịch khám', to: '/patient/appointments/book' },
    { label: 'Lịch khám', to: '/patient/appointments' },
    { label: 'Hồ sơ khám', to: '/patient/medical-records' },
    { label: 'Đơn thuốc', to: '/patient/prescriptions' },
    { label: 'Xét nghiệm', to: '/patient/lab-results' },
    { label: 'Thanh toán', to: '/patient/payments' },
    { label: 'Tin nhắn', to: '/patient/chat' },
];
export default function PatientLayout() {
  const { logout } = useAuthContext();
    return (
        <div className="min-vh-100 bg-light">

            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
                <div className="container">

                   
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#patientNavbar"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="patientNavbar"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            {navItems.map((item) => (
                                <li className="nav-item" key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        end={item.to === '/patient'}
                                        className={({ isActive }) =>
                                            `nav-link ${
                                                isActive
                                                    ? 'active fw-semibold text-primary'
                                                    : ''
                                            }`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}

                        </ul>

                        <div className="dropdown">
                            <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                data-bs-toggle="dropdown"
                            >
                                Tài khoản
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <NavLink
                                        to="/patient/profile"
                                        className="dropdown-item"
                                    >
                                        Hồ sơ cá nhân
                                    </NavLink>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <button className="dropdown-item text-danger"  onClick={logout}>
                                        Đăng xuất
                                    </button>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </nav>

            <main className="container py-4">
                <Outlet />
            </main>

        </div>
    );
}