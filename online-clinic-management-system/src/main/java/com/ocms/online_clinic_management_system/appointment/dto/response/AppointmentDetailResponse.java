package com.ocms.online_clinic_management_system.appointment.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentDetailResponse {

    private Long id;

    private String appointmentStatus;

    private PatientInfo patient;

    private DoctorInfo doctor;

    private ServiceInfo service;

    private ScheduleInfo schedule;

    private String note;

    private InvoiceInfo invoice;

    private LocalDateTime createdAt;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PatientInfo {

        private Long id;
        private String fullName;
        private String phone;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DoctorInfo {

        private Long id;
        private String fullName;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ServiceInfo {

        private Long id;
        private String name;
        private BigDecimal price;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ScheduleInfo {

        private Long id;
        private LocalDate date;
        private LocalTime startTime;
        private LocalTime endTime;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class InvoiceInfo {

        private Long id;
        private BigDecimal totalAmount;
    }

}