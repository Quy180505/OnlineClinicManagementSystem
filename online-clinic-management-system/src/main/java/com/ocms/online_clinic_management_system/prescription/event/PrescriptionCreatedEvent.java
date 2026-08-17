package com.ocms.online_clinic_management_system.prescription.event;

import com.ocms.online_clinic_management_system.common.event.BaseEvent;
import com.ocms.online_clinic_management_system.common.event.DomainEvent;
import lombok.Getter;

@Getter
public class PrescriptionCreatedEvent extends BaseEvent implements DomainEvent {

    private final Long prescriptionId;
    private final Long medicalRecordId;
    private final Long patientId;
    private final Long patientUserId;
    private final Long doctorId;

    public PrescriptionCreatedEvent(Long prescriptionId, Long medicalRecordId, Long patientId, Long patientUserId, Long doctorId) {
        this.prescriptionId = prescriptionId;
        this.medicalRecordId = medicalRecordId;
        this.patientId = patientId;
        this.patientUserId = patientUserId;
        this.doctorId = doctorId;
    }
}