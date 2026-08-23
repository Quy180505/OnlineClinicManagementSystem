package com.ocms.online_clinic_management_system.payment.service.impl;
import com.ocms.online_clinic_management_system.auth.security.SecurityHelper;
import com.ocms.online_clinic_management_system.invoice.entity.Invoice;
import com.ocms.online_clinic_management_system.invoice.event.InvoiceCreatedEvent;
import com.ocms.online_clinic_management_system.invoice.event.InvoiceUpdatedEvent;
import com.ocms.online_clinic_management_system.invoice.exception.InvoiceNotFoundException;
import com.ocms.online_clinic_management_system.invoice.repository.InvoiceRepository;
import com.ocms.online_clinic_management_system.payment.dto.request.CreatePaymentRequest;
import com.ocms.online_clinic_management_system.payment.dto.response.CreatePaymentResponse;
import com.ocms.online_clinic_management_system.payment.dto.response.PaymentResponse;
import com.ocms.online_clinic_management_system.payment.entity.Payment;
import com.ocms.online_clinic_management_system.payment.entity.PaymentMethod;
import com.ocms.online_clinic_management_system.payment.entity.PaymentTransaction;
import com.ocms.online_clinic_management_system.payment.entity.TransactionStatus;
import com.ocms.online_clinic_management_system.payment.exception.PaymentNotFoundException;
import com.ocms.online_clinic_management_system.payment.gateway.PaymentGateway;
import com.ocms.online_clinic_management_system.payment.gateway.PaymentGatewayRequest;
import com.ocms.online_clinic_management_system.payment.gateway.PaymentGatewayResponse;
import com.ocms.online_clinic_management_system.payment.gateway.factory.PaymentGatewayFactory;
import com.ocms.online_clinic_management_system.payment.mapper.PaymentMapper;
import com.ocms.online_clinic_management_system.payment.repository.PaymentRepository;
import com.ocms.online_clinic_management_system.payment.repository.PaymentTransactionRepository;
import com.ocms.online_clinic_management_system.payment.service.PaymentService;
import com.ocms.online_clinic_management_system.payment.validator.PaymentValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentTransactionRepository paymentTransactionRepository;
    private final InvoiceRepository invoiceRepository;
    private final PaymentMapper paymentMapper;
    private final PaymentValidator paymentValidator;
    private final PaymentGatewayFactory paymentGatewayFactory;
    private final SecurityHelper securityHelper;

    @Override
    public void createPaymentFromInvoice(InvoiceCreatedEvent event) {

        Invoice invoice = invoiceRepository.findById(event.getInvoiceId()).orElseThrow(InvoiceNotFoundException::new);

        Payment payment = Payment.builder()
                .invoice(invoice)
                .amountDue(event.getTotalAmount())
                .paymentStatus(paymentValidator.validatePaymentStatus("UNPAID"))
                .build();

        paymentRepository.save(payment);
    }

    @Override
    public void updatePaymentAmount(InvoiceUpdatedEvent event) {
        Payment payment = paymentRepository.findByInvoiceId(event.getInvoiceId()).orElseThrow(PaymentNotFoundException::new);
        payment.setAmountDue(event.getTotalAmount());
        paymentRepository.save(payment);
    }

    @Override
    public CreatePaymentResponse createPayment(Long invoiceId, CreatePaymentRequest request) {

        Long currentUserId = securityHelper.getCurrentUserId();
        Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow(InvoiceNotFoundException::new);
        paymentValidator.validatePatientOwnership(invoice, currentUserId);
        Payment payment = paymentValidator.validatePaymentExistsByInvoiceId(invoiceId);
        paymentValidator.validatePaymentNotPaid(payment);
        PaymentMethod paymentMethod = paymentValidator.validatePaymentMethodExists(request.getPaymentMethodId());
        String transactionCode = generateTransactionCode();
        TransactionStatus pendingStatus = paymentValidator.validateTransactionStatus("PENDING");

        PaymentTransaction transaction = PaymentTransaction.builder()
                        .payment(payment)
                        .paymentMethod(paymentMethod)
                        .transactionCode(transactionCode)
                        .amount(payment.getAmountDue())
                        .transactionStatus(pendingStatus)
                        .build();

        paymentTransactionRepository.save(transaction);
        PaymentGateway gateway = paymentGatewayFactory.getGateway(paymentMethod.getName());

        PaymentGatewayRequest gatewayRequest = PaymentGatewayRequest.builder()
                        .paymentId(payment.getId())
                        .invoiceId(invoice.getId())
                        .amount(payment.getAmountDue())
                        .paymentMethod(paymentMethod.getName())
                        .description("Thanh toan hoa don #" + invoice.getId())
                        .transactionCode(transactionCode)
                        .build();

        PaymentGatewayResponse gatewayResponse = gateway.process(gatewayRequest);
        TransactionStatus transactionStatus = paymentValidator.validateTransactionStatus(gatewayResponse.getTransactionStatus());
        transaction.setTransactionStatus(transactionStatus);
        paymentTransactionRepository.save(transaction);

        return CreatePaymentResponse.builder()
                .paymentId(payment.getId())
                .transactionId(transaction.getId())
                .transactionCode(transaction.getTransactionCode())
                .paymentMethod(paymentMethod.getName())
                .paymentUrl(gatewayResponse.getPaymentUrl())
                .transactionStatus(transactionStatus.getName())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentResponse getMyPayment(Long invoiceId) {

        Long currentUserId = securityHelper.getCurrentUserId();
        Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow(InvoiceNotFoundException::new);
        paymentValidator.validatePatientOwnership(invoice, currentUserId);
        Payment payment = paymentValidator.validatePaymentExistsByInvoiceId(invoiceId);
        return paymentMapper.toResponse(payment);
    }

    private String generateTransactionCode() {
        return "OCMS-" + UUID.randomUUID().toString().replace("-", "").substring(0, 20).toUpperCase();
    }
}