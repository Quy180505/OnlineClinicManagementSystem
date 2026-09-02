package com.ocms.online_clinic_management_system.invoice.controller;
import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.invoice.dto.response.InvoicePatientDetailResponse;
import com.ocms.online_clinic_management_system.invoice.dto.response.InvoicePatientResponse;
import com.ocms.online_clinic_management_system.invoice.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<PageResponse<InvoicePatientResponse>>> searchMyInvoices( @RequestParam(required = false) String paymentStatus,Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(invoiceService.searchMyInvoices(paymentStatus,pageable)));
    }

    @GetMapping("/my/{invoiceId}")
    public ResponseEntity<ApiResponse<InvoicePatientDetailResponse>> getMyInvoice(@PathVariable Long invoiceId) {
        return ResponseEntity.ok(ApiResponse.success(invoiceService.getMyInvoice(invoiceId)));
    }
}