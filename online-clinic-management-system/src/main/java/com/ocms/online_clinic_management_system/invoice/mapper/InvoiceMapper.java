package com.ocms.online_clinic_management_system.invoice.mapper;

import com.ocms.online_clinic_management_system.invoice.dto.response.InvoiceItemResponse;
import com.ocms.online_clinic_management_system.invoice.dto.response.InvoicePatientDetailResponse;
import com.ocms.online_clinic_management_system.invoice.dto.response.InvoicePatientResponse;
import com.ocms.online_clinic_management_system.invoice.entity.Invoice;
import com.ocms.online_clinic_management_system.invoice.entity.InvoiceDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {

    @Mapping(target = "appointmentId", source = "appointment.id")
    @Mapping(target = "doctorName", source = "appointment.doctor.user.fullName")
    @Mapping(target = "serviceName", source = "appointment.service.serviceName")
    @Mapping(target = "paymentStatus", expression = "java(invoice.getPayment() != null && invoice.getPayment().getPaymentStatus() != null ? invoice.getPayment().getPaymentStatus().getName() : \"UNPAID\")")
    InvoicePatientResponse toPatientResponse(Invoice invoice);

    @Mapping(target = "appointmentId", source = "appointment.id")
    @Mapping(target = "doctorName", source = "appointment.doctor.user.fullName")
    @Mapping(target = "serviceName", source = "appointment.service.serviceName")
    @Mapping(target = "paymentStatus", expression = "java(invoice.getPayment() != null && invoice.getPayment().getPaymentStatus() != null ? invoice.getPayment().getPaymentStatus().getName() : \"UNPAID\")")
    @Mapping(target = "details", source = "invoiceDetails")
    InvoicePatientDetailResponse toPatientDetailResponse(Invoice invoice);

    InvoiceItemResponse toItemResponse(InvoiceDetail invoiceDetail);
}