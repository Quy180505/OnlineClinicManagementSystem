import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const RegisterForm = () => {

    const { register } = useAuthContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        fullName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
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

            await register(formData);

            navigate("/patient");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                error.message ||
                "Đăng ký thất bại."
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

            <div className="row">

                <div className="col-md-6 mb-3">

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

           
                <div className="col-md-6 mb-3">

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

            
                <div className="col-12 mb-3">

                    <label className="form-label">
                        Họ tên
                    </label>

                    <input
                        type="text"
                        name="fullName"
                        className="form-control"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />

                </div>

             
                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                    />

                </div>

          
                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        Số điện thoại
                    </label>

                    <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                </div>

              
                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        Ngày sinh
                    </label>

                    <input
                        type="date"
                        name="dateOfBirth"
                        className="form-control"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />

                </div>

     
                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        Giới tính
                    </label>

                    <select
                        name="gender"
                        className="form-select"
                        value={formData.gender}
                        onChange={handleChange}
                    >

                        <option value="">
                            -- Chọn giới tính --
                        </option>

                        <option value="MALE">
                            Nam
                        </option>

                        <option value="FEMALE">
                            Nữ
                        </option>

                        <option value="OTHER">
                            Khác
                        </option>

                    </select>

                </div>

            </div>

            <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
            >
                {loading
                    ? "Đang đăng ký..."
                    : "Đăng ký"}
            </button>

        </form>
    );
};

export default RegisterForm;