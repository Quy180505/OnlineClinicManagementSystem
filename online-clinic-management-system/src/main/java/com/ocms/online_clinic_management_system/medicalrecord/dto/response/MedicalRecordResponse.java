package com.ocms.online_clinic_management_system.medicalrecord.dto.response;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalRecordResponse {

    private Long id;
    private Long appointmentId;
    private Long patientId;
    private Long doctorId;
    private String symptoms;
    private String examinationResult;
    private String diagnosis;
    private LocalDateTime examinationDate;

}