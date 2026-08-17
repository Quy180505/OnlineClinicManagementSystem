package com.ocms.online_clinic_management_system.invoice.service;
import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import com.ocms.online_clinic_management_system.invoice.entity.Invoice;
import com.ocms.online_clinic_management_system.laboratory.event.TestOrderCreatedEvent;
import com.ocms.online_clinic_management_system.prescription.entity.Prescription;

public interface InvoiceService {

    Invoice createInitialInvoice(Appointment appointment);
    Invoice getByAppointmentId(Long appointmentId);
    void addTestOrderToInvoice(TestOrderCreatedEvent event);
    void addPrescriptionToInvoice(Prescription prescription);
}