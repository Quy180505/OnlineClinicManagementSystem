import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const LoginForm = () => {

    const { login } = useAuthContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const data = await login(formData);

            switch (data.role) {

                case "ROLE_ADMIN":
                    navigate("/admin");
                    break;

                case "ROLE_DOCTOR":
                    navigate("/doctor");
                    break;

                case "ROLE_STAFF":
                    navigate("/staff");
                    break;

                case "ROLE_PATIENT":
                    navigate("/patient");
                    break;

                default:
                    setError("Vai trò người dùng không hợp lệ.");
            }

        } catch (error) {

            setError(
                error.response?.data?.message ||
                error.message ||
                "Đăng nhập thất bại."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <form onSubmit={handleSubmit}>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="mb-3">

                <label className="form-label">
                    Username
                </label>

                <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-4">

                <label className="form-label">
                    Password
                </label>

                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

            </div>

            <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
            >
                {loading
                    ? "Đang đăng nhập..."
                    : "Đăng nhập"}
            </button>

        </form>
    );
};

export default LoginForm;