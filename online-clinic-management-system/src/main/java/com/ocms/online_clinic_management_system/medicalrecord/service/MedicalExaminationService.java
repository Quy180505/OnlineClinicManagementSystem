package com.ocms.online_clinic_management_system.medicalrecord.service;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.MedicalExaminationResponse;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.TodayAppointmentResponse;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.TreatmentHistoryResponse;
import java.util.List;

public interface MedicalExaminationService {

    List<TodayAppointmentResponse> getTodayAppointments();
    MedicalExaminationResponse startMedicalExamination(Long appointmentId);
    List<TreatmentHistoryResponse> getTreatmentHistory(Long appointmentId);
}