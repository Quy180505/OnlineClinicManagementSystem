package com.ocms.online_clinic_management_system.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {


    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "SYS_500", "Internal server error"),
    INVALID_REQUEST(HttpStatus.BAD_REQUEST, "SYS_400", "Invalid request"),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "SYS_404", "Resource not found"),
    INVALID_USERNAME_OR_PASSWORD(HttpStatus.UNAUTHORIZED, "AUTH_001", "Invalid username or password"),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "AUTH_002", "Invalid JWT token"),
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "AUTH_003", "JWT token has expired"),
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "AUTH_004", "Access denied"),

    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "USER_001", "User not found"),
    USERNAME_ALREADY_EXISTS(HttpStatus.CONFLICT, "USER_002", "Username already exists"),
    EMAIL_ALREADY_EXISTS(HttpStatus.CONFLICT, "USER_003", "Email already exists"),
    PHONE_ALREADY_EXISTS(HttpStatus.CONFLICT, "USER_004", "Phone already exists"),
    INVALID_ROLE(HttpStatus.BAD_REQUEST, "USER_005", "Invalid role"),


    DOCTOR_NOT_FOUND(HttpStatus.NOT_FOUND, "DOCTOR_001", "Doctor not found"),

    STAFF_NOT_FOUND(HttpStatus.NOT_FOUND, "STAFF_001", "Staff not found"),

    PATIENT_NOT_FOUND(HttpStatus.NOT_FOUND, "PATIENT_001", "Patient not found"),
    INVALID_CITIZEN_ID(HttpStatus.BAD_REQUEST, "PATIENT_002", "Citizen ID is invalid"),
    INVALID_EMERGENCY_CONTACT(HttpStatus.BAD_REQUEST, "PATIENT_003", "Emergency contact is invalid"),
    INVALID_MEDICAL_HISTORY(HttpStatus.BAD_REQUEST, "PATIENT_004", "Medical history is invalid"),
    INVALID_ALLERGY_INFO(HttpStatus.BAD_REQUEST, "PATIENT_005", "Allergy information is invalid"),
    PASSWORD_NOT_MATCH(HttpStatus.BAD_REQUEST, "PATIENT_006", "Password confirmation does not match"),

    SPECIALTY_NOT_FOUND(HttpStatus.NOT_FOUND, "SPECIALTY_001", "Specialty not found"),
    SPECIALTY_ALREADY_EXISTS(HttpStatus.CONFLICT, "SPECIALTY_002", "Specialty already exists"),

    MEDICAL_SERVICE_NOT_FOUND(HttpStatus.NOT_FOUND, "SERVICE_001", "Medical service not found"),
    MEDICAL_SERVICE_ALREADY_EXISTS(HttpStatus.CONFLICT, "SERVICE_002", "Medical service already exists"),

    DOCTOR_SCHEDULE_NOT_FOUND(HttpStatus.NOT_FOUND, "SCHEDULE_001", "Doctor schedule not found"),
    DOCTOR_SCHEDULE_ALREADY_EXISTS(HttpStatus.CONFLICT, "SCHEDULE_002", "Doctor schedule already exists"),
    INVALID_SCHEDULE_TIME(HttpStatus.BAD_REQUEST, "SCHEDULE_003", "Invalid schedule time"),


    APPOINTMENT_STATUS_NOT_FOUND(HttpStatus.NOT_FOUND, "APPOINTMENT_001", "Appointment status not found"),
    APPOINTMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "APPOINTMENT_002", "Appointment not found"),
    APPOINTMENT_ALREADY_EXISTS(HttpStatus.CONFLICT, "APPOINTMENT_003", "Appointment already exists"),
    INVALID_APPOINTMENT_STATUS(HttpStatus.BAD_REQUEST, "APPOINTMENT_004", "Invalid appointment status"),
    APPOINTMENT_CANCELLATION_NOT_ALLOWED(HttpStatus.CONFLICT, "APPOINTMENT_005", "Appointment cancellation is not allowed"),
    SCHEDULE_UNAVAILABLE(HttpStatus.BAD_REQUEST, "APPOINTMENT_006", "Doctor schedule is unavailable"),
    INVALID_APPOINTMENT_SERVICE(HttpStatus.BAD_REQUEST, "APPOINTMENT_007", "Medical service does not belong to doctor's specialty"),
    APPOINTMENT_SCHEDULE_FULL(HttpStatus.BAD_REQUEST,"APPOINTMENT_008","Doctor schedule is full"),
    APPOINTMENT_ACCESS_DENIED(HttpStatus.FORBIDDEN, "APPOINTMENT_009", "You do not have permission to access this appointment"),
    APPOINTMENT_NOT_CONFIRMED(HttpStatus.BAD_REQUEST, "APPOINTMENT_010", "Appointment is not confirmed"),
    APPOINTMENT_EXAM_SERVICE_REQUIRED(HttpStatus.BAD_REQUEST, "APPOINTMENT_011", "Only examination services can be booked"),
    MEDICAL_EXAMINATION_ACCESS_DENIED(HttpStatus.FORBIDDEN, "MEDICAL_RECORD_001", "You do not have permission to perform this medical examination"),
    MEDICAL_RECORD_ALREADY_EXISTS(HttpStatus.CONFLICT, "MEDICAL_RECORD_002", "Medical record already exists for this appointment"),
    MEDICAL_RECORD_NOT_FOUND(HttpStatus.NOT_FOUND, "MEDICAL_RECORD_003", "Medical record not found"),

    INVOICE_NOT_FOUND(HttpStatus.NOT_FOUND,"INVOICE_001", "Invoice not found"),
    INVOICE_ALREADY_EXISTS(HttpStatus.CONFLICT,"INVOICE_002", "Invoice already exists"),

    TEST_ORDER_NOT_FOUND(HttpStatus.NOT_FOUND, "LAB_001", "Test order not found"),
    TEST_ORDER_DETAIL_NOT_FOUND(HttpStatus.NOT_FOUND, "LAB_003", "Test order detail not found"),
    LAB_RESULT_NOT_FOUND(HttpStatus.NOT_FOUND, "LAB_004", "Lab result not found"),
    LAB_RESULT_ALREADY_EXISTS(HttpStatus.CONFLICT, "LAB_005", "Lab result already exists"),
    LABORATORY_ACCESS_DENIED(HttpStatus.FORBIDDEN, "LAB_006", "You do not have permission to access laboratory data"),
    INVALID_TEST_ORDER_STATUS(HttpStatus.BAD_REQUEST, "LAB_007", "Test order status is invalid"),
    INVALID_LAB_SERVICE(HttpStatus.BAD_REQUEST, "LAB_008", "Medical service is not valid for this doctor"),
    INVALID_LAB_SERVICE_TYPE(HttpStatus.BAD_REQUEST,"LAB_009","Only test services can be ordered");
    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}