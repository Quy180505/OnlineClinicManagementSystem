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
    USERNAME_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "USER_002", "Username already exists"),
    EMAIL_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "USER_003", "Email already exists"),
    PHONE_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "USER_004", "Phone already exists"),
    INVALID_ROLE(HttpStatus.BAD_REQUEST, "USER_005", "Invalid role"),


    DOCTOR_NOT_FOUND(HttpStatus.NOT_FOUND, "DOCTOR_001", "Doctor not found"),


    STAFF_NOT_FOUND(HttpStatus.NOT_FOUND, "STAFF_001", "Staff not found"),


    PATIENT_NOT_FOUND(HttpStatus.NOT_FOUND, "PATIENT_001", "Patient not found"),

    INVALID_CITIZEN_ID(HttpStatus.BAD_REQUEST, "PATIENT_002", "Citizen ID is invalid"),
    INVALID_EMERGENCY_CONTACT(HttpStatus.BAD_REQUEST, "PATIENT_003", "Emergency contact is invalid"),
    INVALID_MEDICAL_HISTORY(HttpStatus.BAD_REQUEST, "PATIENT_004", "Medical history is invalid"),
    INVALID_ALLERGY_INFO(HttpStatus.BAD_REQUEST, "PATIENT_005", "Allergy information is invalid"),
    PASSWORD_NOT_MATCH(HttpStatus.BAD_REQUEST, "PATIENT_006", "Password confirmation does not match"),

    SPECIALTY_NOT_FOUND(HttpStatus.NOT_FOUND, "SPECIALTY_001", "Specialty not found");

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}