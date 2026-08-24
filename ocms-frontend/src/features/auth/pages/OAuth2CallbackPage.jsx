import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const OAuth2CallbackPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const { loginWithOAuth2 } = useAuthContext();

    const processedRef = useRef(false);

    useEffect(() => {
        if (processedRef.current) {
            return;
        }

        processedRef.current = true;
        
        const errorCode = searchParams.get("error");

        if (errorCode) {
            const errorMessages = {
                AUTH_001: "Đăng nhập Google đã bị hủy hoặc không thành công.",
            };

            sessionStorage.setItem(
                "oauth2Error",
                errorMessages[errorCode] || "Đăng nhập Google thất bại."
            );

            navigate("/login/patient", { replace: true });

            return;
        }




        const token = searchParams.get("token");
        const userId = searchParams.get("userId");
        const username = searchParams.get("username");
        const fullName = searchParams.get("fullName");
        const role = searchParams.get("role");

        if (!token || !userId || !username || !role) {
            navigate("/login/patient", { replace: true });
            return;
        }

        const authData = {
            userId: Number(userId),
            username,
            fullName,
            role,
            token: {accessToken: token,tokenType: "Bearer",},
        };

        loginWithOAuth2(authData);
        switch (role) {
            case "ROLE_PATIENT":
                navigate("/patient", { replace: true });
                break;

            case "ROLE_DOCTOR":
                navigate("/doctor", { replace: true });
                break;

            case "ROLE_STAFF":
                navigate("/staff", { replace: true });
                break;

            case "ROLE_ADMIN":
                navigate("/admin", { replace: true });
                break;

            default:
                navigate("/", { replace: true });
        }
    }, [searchParams, navigate, loginWithOAuth2]);

    return (
        <div className="container py-5">
            <div className="text-center">

                <div className="spinner-border mb-3" role="status">
                    <span className="visually-hidden">
                        Đang xử lý...
                    </span>
                </div>

                <p className="text-secondary">
                    Đang đăng nhập bằng Google...
                </p>

            </div>
        </div>
    );
};

export default OAuth2CallbackPage;