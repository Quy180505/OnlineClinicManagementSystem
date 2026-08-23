package com.ocms.online_clinic_management_system.medicalrecord.dto.response;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientMedicalHistoryDetailResponse {

    private Long medicalRecordId;
    private Long appointmentId;
    private LocalDateTime examinationDate;
    private String specialtyName;
    private Long doctorId;
    private String doctorName;
    private String appointmentStatus;
    private String symptoms;
    private String examinationResult;
    private String diagnosis;
    private List<String> diseases;
}