package com.ocms.online_clinic_management_system.medicalrecord.dto.response;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TreatmentHistoryResponse {

    private Long medicalRecordId;
    private Long appointmentId;
    private Long doctorId;
    private String doctorName;
    private LocalDateTime examinationDate;
    private String symptoms;
    private String examinationResult;
    private String diagnosis;
    private List<String> diseases;
    private String appointmentStatus;
}