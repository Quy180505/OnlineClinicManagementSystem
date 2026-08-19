package com.ocms.online_clinic_management_system.payment.service;

import java.util.Map;

public interface VNPayService {

    Map<String, Object> handleIpn(Map<String, String> params);

    Map<String, Object> handleReturn(Map<String, String> params);
}