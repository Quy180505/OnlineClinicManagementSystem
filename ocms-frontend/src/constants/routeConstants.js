export const ROUTES = {
    ROOT: "/",

    AUTH: {
        LOGIN: "/login",
        LOGIN_PATIENT: "/login/patient",
        LOGIN_STAFF: "/login/staff",
        REGISTER: "/register",
        OAUTH2_CALLBACK: "/oauth2/callback",
    },

    ADMIN: {
      ROOT: "/admin",

      USERS: {
          LIST: "/admin/users",
          CREATE_DOCTOR: "/admin/users/create-doctor",
          CREATE_STAFF: "/admin/users/create-staff",
      },
  },

    PATIENT: {
        ROOT: "/patient",
        PROFILE: "/patient/profile",
    },

    STAFF: {
        ROOT: "/staff",
        PATIENTS: "/staff/patients",
    },

    DOCTOR: {
        ROOT: "/doctor",
    },
};