package com.ocms.online_clinic_management_system.invoice.service;
import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import com.ocms.online_clinic_management_system.invoice.entity.Invoice;

public interface InvoiceService {

    Invoice createInitialInvoice(Appointment appointment);
    Invoice getByAppointmentId(Long appointmentId);
}