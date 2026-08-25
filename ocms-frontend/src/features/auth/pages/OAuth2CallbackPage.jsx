import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { ROUTES } from "../../../constants/routeConstants";
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

            navigate(ROUTES.AUTH.LOGIN_PATIENT, { replace: true });

            return;
        }
        
        const token = searchParams.get("token");
        const userId = searchParams.get("userId");
        const username = searchParams.get("username");
        const fullName = searchParams.get("fullName");
        const role = searchParams.get("role");

        if (!token || !userId || !username || !role) {
            navigate(ROUTES.AUTH.LOGIN_PATIENT, { replace: true });
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
                navigate(ROUTES.PATIENT.ROOT, { replace: true });
                break;

            case "ROLE_DOCTOR":
                navigate(ROUTES.DOCTOR.ROOT, { replace: true });
                break;

            case "ROLE_STAFF":
                navigate(ROUTES.STAFF.ROOT, { replace: true });
                break;

            case "ROLE_ADMIN":
                navigate(ROUTES.ADMIN.ROOT, { replace: true });
                break;

            default:
                navigate(ROUTES.ROOT, { replace: true });
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