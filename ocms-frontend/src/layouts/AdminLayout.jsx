import { NavLink, Outlet } from 'react-router-dom';
import { useAuthContext } from '../features/auth/hooks/useAuthContext';
import { ROUTES } from "../constants/routeConstants";

const navItems = [
  {
    label: "Trang chủ",
    to: ROUTES.ADMIN.ROOT,
  },
  {
    label: "Tài khoản",
    to: ROUTES.ADMIN.USERS.LIST,
  },
  {
    label: "Chuyên khoa",
    to: ROUTES.ADMIN.SPECIALTIES.LIST,
  },
  {
    label: "Dịch vụ y tế",
    to: ROUTES.ADMIN.MEDICAL_SERVICES.LIST,
  },
  {
    label: "Thuốc",
    to: ROUTES.ADMIN.MEDICINES.LIST,
  },
  {
    label: "Kho thuốc",
    to: ROUTES.ADMIN.INVENTORY.LIST,
  },
  {
    label: "Báo cáo",
    to: "/admin/reports",
  },
];

export default function AdminLayout() {
     const { logout } = useAuthContext();
    return (
        <div className="min-vh-100 bg-light">

            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
                <div className="container">

        
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#adminNavbar"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="adminNavbar"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            {navItems.map((item) => (
                                <li className="nav-item" key={item.to}>
                                 <NavLink
                                    to={item.to}
                                    end={item.to === ROUTES.ADMIN.ROOT}
                                    className={({ isActive }) =>
                                        `nav-link ${
                                        isActive
                                            ? "active fw-semibold text-primary"
                                            : ""
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
                                        to="/admin/profile"
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