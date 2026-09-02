package com.ocms.online_clinic_management_system.invoice.service;
import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.invoice.dto.response.InvoicePatientDetailResponse;
import com.ocms.online_clinic_management_system.invoice.dto.response.InvoicePatientResponse;
import com.ocms.online_clinic_management_system.invoice.entity.Invoice;
import com.ocms.online_clinic_management_system.laboratory.event.TestOrderCreatedEvent;
import com.ocms.online_clinic_management_system.prescription.entity.Prescription;
import org.springframework.data.domain.Pageable;

public interface InvoiceService {

    void createInitialInvoice(Appointment appointment);
    Invoice getByAppointmentId(Long appointmentId);
    void addTestOrderToInvoice(TestOrderCreatedEvent event);
    void addPrescriptionToInvoice(Prescription prescription);
    PageResponse<InvoicePatientResponse> searchMyInvoices(String paymentStatus,Pageable pageable);
    InvoicePatientDetailResponse getMyInvoice(Long invoiceId);
}