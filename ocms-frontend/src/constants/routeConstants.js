export const ROUTES = {
  ROOT: "/",

  AUTH: {
    LOGIN: "/login",
    LOGIN_PATIENT: "/login/patient",
    LOGIN_STAFF: "/login/staff",
    REGISTER: "/register",
    OAUTH2_CALLBACK: "/oauth2/callback"
  },

  ADMIN: {
    ROOT: "/admin",

    USERS: {
      LIST: "/admin/users",
      CREATE_DOCTOR: "/admin/users/create-doctor",
      CREATE_STAFF: "/admin/users/create-staff"
    },

    SPECIALTIES: {
      LIST: "/admin/specialties",
      DETAIL: (specialtyId) => `/admin/specialties/${specialtyId}`
    },

    MEDICAL_SERVICES: {
      LIST: "/admin/medical-services",
      DETAIL: (medicalServiceId) =>
        `/admin/medical-services/${medicalServiceId}`
    },

    MEDICINES: {
     LIST: "/admin/medicines"
    },

    INVENTORY: {
      LIST: "/admin/inventory",
      DETAIL: (inventoryId) => `/admin/inventory/${inventoryId}`,
      TRANSACTIONS: (inventoryId) =>`/admin/inventory/${inventoryId}/transactions`
    },

    REPORTS: {
      LIST: "/admin/reports"
    }
  },

  PATIENT: {
    ROOT: "/patient",
    PROFILE: "/patient/profile",

    CHAT: "/patient/chat",

    APPOINTMENTS: {
      LIST: "/patient/appointments",
      BOOK: "/patient/appointments/book",
      DETAIL: (appointmentId) => `/patient/appointments/${appointmentId}`
    },


    MEDICAL_RECORDS: {
        LIST: "/patient/medical-records",
        DETAIL: (medicalRecordId) => `/patient/medical-records/${medicalRecordId}`
    },

    PRESCRIPTIONS: {
      LIST: "/patient/prescriptions",
      DETAIL: (prescriptionId) =>`/patient/prescriptions/${prescriptionId}`
    },

    INVOICES: {
      LIST: "/patient/invoices",
      DETAIL: (invoiceId) =>`/patient/invoices/${invoiceId}`,
    },
  },

  STAFF: {
    ROOT: "/staff",

    PATIENTS: {
      LIST: "/staff/patients",
      DETAIL: (patientId) => `/staff/patients/${patientId}`
    },

    DOCTOR_SCHEDULES: {
      LIST: "/staff/doctor-schedules",
      CREATE: "/staff/doctor-schedules/create",
      DETAIL: (doctorScheduleId) =>`/staff/doctor-schedules/${doctorScheduleId}`
    },

    APPOINTMENTS: {
      LIST: "/staff/appointments",
      DETAIL: (appointmentId) => `/staff/appointments/${appointmentId}`
    },

    LABORATORY: {
      ROOT: "/staff/laboratory"
    },
  },

  DOCTOR: {
    ROOT: "/doctor",

    CHAT: "/doctor/chat",
    
    MEDICAL_EXAMINATIONS: {
      TODAY: "/doctor/today",
      TREATMENT_HISTORY: (appointmentId) =>`/doctor/today/${appointmentId}/treatment-history`
    },

    MEDICAL_RECORDS: {
        DETAIL: (appointmentId) => `/doctor/medical-records/${appointmentId}`,
    },

    LABORATORY: {
      TEST_ORDER: (testOrderId) =>`/doctor/laboratory/test-orders/${testOrderId}`
    },

    PRESCRIPTIONS: {
      LIST: "/doctor/prescriptions"
    },


  },
};
