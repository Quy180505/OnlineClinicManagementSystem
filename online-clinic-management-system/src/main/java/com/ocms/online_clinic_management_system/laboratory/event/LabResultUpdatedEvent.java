package com.ocms.online_clinic_management_system.laboratory.event;

import com.ocms.online_clinic_management_system.common.event.BaseEvent;
import com.ocms.online_clinic_management_system.common.event.DomainEvent;
import lombok.Getter;

@Getter
public class LabResultUpdatedEvent extends BaseEvent implements DomainEvent {

    private final Long labResultId;
    private final Long testOrderDetailId;
    private final Long testOrderId;
    private final Long medicalRecordId;
    private final Long patientId;
    private final Long doctorId;

    public LabResultUpdatedEvent(Long labResultId, Long testOrderDetailId, Long testOrderId, Long medicalRecordId, Long patientId, Long doctorId) {
        this.labResultId = labResultId;
        this.testOrderDetailId = testOrderDetailId;
        this.testOrderId = testOrderId;
        this.medicalRecordId = medicalRecordId;
        this.patientId = patientId;
        this.doctorId = doctorId;
    }
}