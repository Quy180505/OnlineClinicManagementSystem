package com.ocms.online_clinic_management_system.payment.mapper;
import com.ocms.online_clinic_management_system.payment.dto.response.PaymentResponse;
import com.ocms.online_clinic_management_system.payment.dto.response.PaymentTransactionResponse;
import com.ocms.online_clinic_management_system.payment.entity.Payment;
import com.ocms.online_clinic_management_system.payment.entity.PaymentTransaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    @Mapping(source = "invoice.id", target = "invoiceId")
    @Mapping(source = "paymentStatus.id", target = "paymentStatusId")
    @Mapping(source = "paymentStatus.name", target = "paymentStatusName")
    PaymentResponse toResponse(Payment payment);

    @Mapping(source = "paymentMethod.id", target = "paymentMethodId")
    @Mapping(source = "paymentMethod.name", target = "paymentMethodName")
    @Mapping(source = "transactionStatus.id", target = "transactionStatusId")
    @Mapping(source = "transactionStatus.name", target = "transactionStatusName")
    PaymentTransactionResponse toTransactionResponse(PaymentTransaction transaction);
}