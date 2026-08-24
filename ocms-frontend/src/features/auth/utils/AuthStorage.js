const ACCESS_TOKEN_KEY = "accessToken";
const USER_KEY = "user";

export const authStorage = {
    saveAuth(loginResponse) {
        localStorage.setItem(ACCESS_TOKEN_KEY,loginResponse.token.accessToken );

        localStorage.setItem(
            USER_KEY,
            JSON.stringify({
                userId: loginResponse.userId,
                username: loginResponse.username,
                fullName: loginResponse.fullName,
                role: loginResponse.role,
            })
        );
    },

    getToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },

    getUser() {
        const user = localStorage.getItem(USER_KEY);

        return user ? JSON.parse(user) : null;
    },

    clearAuth() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    isAuthenticated() {
        return !!localStorage.getItem(ACCESS_TOKEN_KEY);
    },
};