package com.ocms.online_clinic_management_system.payment.controller;
import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.payment.dto.request.CreatePaymentRequest;
import com.ocms.online_clinic_management_system.payment.dto.response.CreatePaymentResponse;
import com.ocms.online_clinic_management_system.payment.dto.response.PaymentResponse;
import com.ocms.online_clinic_management_system.payment.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/invoices/{invoiceId}")
    public ResponseEntity<ApiResponse<CreatePaymentResponse>> createPayment(@PathVariable Long invoiceId, @Valid @RequestBody CreatePaymentRequest request) {
        return ResponseEntity.ok(ApiResponse.success(paymentService.createPayment(invoiceId, request)));
    }

    @GetMapping("/invoices/{invoiceId}")
    public ResponseEntity<ApiResponse<PaymentResponse>> getMyPayment(@PathVariable Long invoiceId) {
        return ResponseEntity.ok(ApiResponse.success(paymentService.getMyPayment(invoiceId)));
    }
}