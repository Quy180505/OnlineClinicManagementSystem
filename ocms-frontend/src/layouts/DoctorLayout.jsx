import { NavLink, Outlet } from 'react-router-dom';
import { useAuthContext } from '../features/auth/hooks/useAuthContext';

const navItems = [
    { label: 'Trang chủ', to: '/doctor' },
    { label: 'Lịch khám', to: '/doctor/schedules' },
    { label: 'Bệnh nhân hôm nay', to: '/doctor/today' },
    { label: 'Xét nghiệm', to: '/doctor/laboratory' },
    { label: 'Đơn thuốc', to: '/doctor/prescriptions' },
    { label: 'Tin nhắn', to: '/doctor/chat' },
];

export default function DoctorLayout() {
     const { logout } = useAuthContext();
    return (
        <div className="min-vh-100 bg-light">

            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
                <div className="container">

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#doctorNavbar"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="doctorNavbar"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            {navItems.map((item) => (
                                <li className="nav-item" key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        end={item.to === '/doctor'}
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
                                        to="/doctor/profile"
                                        className="dropdown-item"
                                    >
                                        Hồ sơ cá nhân
                                    </NavLink>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <button className="dropdown-item text-danger" onClick={logout}>
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