package com.ocms.online_clinic_management_system.payment.service;
import java.util.Map;
import org.springframework.http.ResponseEntity;
public interface VNPayService {

    Map<String, Object> handleIpn(Map<String, String> params);
    ResponseEntity<Void> handleReturn(Map<String, String> params);
}