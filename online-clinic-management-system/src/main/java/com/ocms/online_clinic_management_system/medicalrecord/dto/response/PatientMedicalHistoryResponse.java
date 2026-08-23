package com.ocms.online_clinic_management_system.medicalrecord.dto.response;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientMedicalHistoryResponse {

    private Long medicalRecordId;
    private Long appointmentId;
    private LocalDateTime examinationDate;
    private String specialtyName;
    private Long doctorId;
    private String doctorName;
    private String appointmentStatus;
}