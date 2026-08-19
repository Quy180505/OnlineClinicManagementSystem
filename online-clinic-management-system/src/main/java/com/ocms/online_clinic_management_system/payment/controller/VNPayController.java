package com.ocms.online_clinic_management_system.payment.controller;

import com.ocms.online_clinic_management_system.payment.service.VNPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments/vnpay")
@RequiredArgsConstructor
public class VNPayController {

    private final VNPayService vnPayService;

    @GetMapping("/ipn")
    public ResponseEntity<Map<String, Object>> ipn(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(vnPayService.handleIpn(params));
    }

    @GetMapping("/return")
    public ResponseEntity<Map<String, Object>> paymentReturn(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(vnPayService.handleReturn(params));
    }
}