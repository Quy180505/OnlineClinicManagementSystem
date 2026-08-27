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

    SPECIALTIES: {
      LIST: "/admin/specialties",
      DETAIL: (specialtyId) => `/admin/specialties/${specialtyId}`,
    },

    MEDICAL_SERVICES: {
      LIST: "/admin/medical-services",
      DETAIL: (medicalServiceId) =>
        `/admin/medical-services/${medicalServiceId}`,
    },
  },

  PATIENT: {
    ROOT: "/patient",
    PROFILE: "/patient/profile",


    APPOINTMENTS: {
      LIST: "/patient/appointments",
      BOOK: "/patient/appointments/book",
      DETAIL: (appointmentId) => `/patient/appointments/${appointmentId}`,
    },
  },

  STAFF: {
    ROOT: "/staff",

    PATIENTS: {
      LIST: "/staff/patients",
      DETAIL: (patientId) => `/staff/patients/${patientId}`,
    },

    DOCTOR_SCHEDULES: {
      LIST: "/staff/doctor-schedules",
      CREATE: "/staff/doctor-schedules/create",
      DETAIL: (doctorScheduleId) =>
        `/staff/doctor-schedules/${doctorScheduleId}`,
    },

    APPOINTMENTS: {
      LIST: "/staff/appointments",
      DETAIL: (appointmentId) => `/staff/appointments/${appointmentId}`,
    },
  },

  DOCTOR: {
    ROOT: "/doctor",
  },
};
