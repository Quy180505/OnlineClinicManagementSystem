package com.ocms.online_clinic_management_system.payment.service.impl;
import com.ocms.online_clinic_management_system.payment.entity.Payment;
import com.ocms.online_clinic_management_system.payment.entity.PaymentTransaction;
import com.ocms.online_clinic_management_system.payment.entity.TransactionStatus;
import com.ocms.online_clinic_management_system.payment.event.PaymentCompletedEvent;
import com.ocms.online_clinic_management_system.payment.event.PaymentFailedEvent;
import com.ocms.online_clinic_management_system.payment.gateway.config.VNPayProperties;
import com.ocms.online_clinic_management_system.payment.repository.PaymentRepository;
import com.ocms.online_clinic_management_system.payment.repository.PaymentTransactionRepository;
import com.ocms.online_clinic_management_system.payment.service.VNPayService;
import com.ocms.online_clinic_management_system.payment.validator.PaymentValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

@Service
@RequiredArgsConstructor
@Transactional
public class VNPayServiceImpl implements VNPayService {

    private final VNPayProperties vnpayProperties;
    private final PaymentRepository paymentRepository;
    private final PaymentTransactionRepository paymentTransactionRepository;
    private final PaymentValidator paymentValidator;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    public Map<String, Object> handleIpn(Map<String, String> params) {

        Map<String, Object> response = new HashMap<>();

        if (!verifySignature(params)) {
            response.put("RspCode", "97");
            response.put("Message", "Invalid signature");
            return response;
        }

        String transactionCode = params.get("vnp_TxnRef");

        if (transactionCode == null || transactionCode.isBlank()) {
            response.put("RspCode", "01");
            response.put("Message", "Transaction not found");
            return response;
        }


        PaymentTransaction transaction = paymentTransactionRepository.findByTransactionCode(transactionCode).orElse(null);

        if (transaction == null) {
            response.put("RspCode", "01");
            response.put("Message", "Transaction not found");
            return response;
        }

        Payment payment = transaction.getPayment();
        String vnpAmount = params.get("vnp_Amount");

        if (vnpAmount == null) {
            response.put("RspCode", "04");
            response.put("Message", "Invalid amount");
            return response;
        }

        try {

            BigDecimal amountFromVNPay = new BigDecimal(vnpAmount).divide(BigDecimal.valueOf(100));

            if (amountFromVNPay.compareTo(transaction.getAmount()) != 0)
            {
                response.put("RspCode", "04");
                response.put("Message", "Invalid amount");
                return response;
            }

        } catch (NumberFormatException e) {
            response.put("RspCode", "04");
            response.put("Message", "Invalid amount");
            return response;
        }

        if ("SUCCESS".equalsIgnoreCase(transaction.getTransactionStatus().getName())) {
            response.put("RspCode", "02");
            response.put("Message", "Transaction already confirmed");
            return response;
        }

        String responseCode = params.get("vnp_ResponseCode");
        String transactionStatus = params.get("vnp_TransactionStatus");

        boolean success = "00".equals(responseCode) && "00".equals(transactionStatus);

        if (success) {
            TransactionStatus successStatus = paymentValidator.validateTransactionStatus("SUCCESS");
            transaction.setTransactionStatus(successStatus);
            paymentTransactionRepository.save(transaction);
            var paidStatus = paymentValidator.validatePaymentStatus("PAID");
            payment.setPaymentStatus(paidStatus);
            paymentRepository.save(payment);
            publishPaymentCompletedEvent(payment, transaction);
            response.put("RspCode", "00");
            response.put("Message", "Confirm Success");

            return response;
        }

        TransactionStatus failedStatus = paymentValidator.validateTransactionStatus("FAILED");
        transaction.setTransactionStatus(failedStatus);
        paymentTransactionRepository.save(transaction);
        publishPaymentFailedEvent(payment, transaction);
        response.put("RspCode", "00");
        response.put("Message", "Confirm Success");

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> handleReturn(Map<String, String> params) {

        Map<String, Object> response = new HashMap<>();

        boolean validSignature = verifySignature(params);

        if (!validSignature) {
            response.put("success", false);
            response.put("responseCode", "97");
            response.put("message", "Invalid signature");

            return response;
        }

        String responseCode = params.get("vnp_ResponseCode");

        String transactionStatus = params.get("vnp_TransactionStatus");

        boolean success = "00".equals(responseCode) && "00".equals(transactionStatus);

        response.put("success", success);
        response.put("responseCode", responseCode);
        response.put("transactionStatus", transactionStatus);
        response.put("transactionCode", params.get("vnp_TxnRef"));
        response.put("message", success ? "Thanh toán thành công" : "Thanh toán không thành công");

        return response;
    }

    private boolean verifySignature(Map<String, String> params) {

        String receivedHash = params.get("vnp_SecureHash");

        if (receivedHash == null) {
            return false;
        }

        Map<String, String> filteredParams = new TreeMap<>();

        for (Map.Entry<String, String> entry : params.entrySet()) {

            String key = entry.getKey();

            if (key.equals("vnp_SecureHash") || key.equals("vnp_SecureHashType")) {
                continue;
            }

            if (entry.getValue() == null || entry.getValue().isBlank()) {
                continue;
            }

            filteredParams.put(key, entry.getValue());
        }

        StringBuilder hashData = new StringBuilder();

        for (Map.Entry<String, String> entry : filteredParams.entrySet()) {

            if (!hashData.isEmpty()) {
                hashData.append("&");
            }

            hashData.append(entry.getKey());
            hashData.append("=");

            hashData.append(java.net.URLEncoder.encode(entry.getValue(), StandardCharsets.US_ASCII));
        }

        String calculatedHash = hmacSHA512(vnpayProperties.getHashSecret(), hashData.toString());

        return calculatedHash.equalsIgnoreCase(receivedHash);
    }

    private String hmacSHA512(String secretKey, String data) {

        try {

            Mac hmac = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
            hmac.init(secretKeySpec);

            byte[] hash = hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));

            StringBuilder result = new StringBuilder();

            for (byte b : hash) {
                result.append(String.format("%02x", b));
            }

            return result.toString();

        } catch (Exception e) {
            throw new IllegalStateException("Failed to verify VNPay signature", e);
        }
    }

    private void publishPaymentCompletedEvent(Payment payment, PaymentTransaction transaction) {

        var invoice = payment.getInvoice();
        eventPublisher.publishEvent(new PaymentCompletedEvent(
                        payment.getId(),
                        invoice.getId(),
                        invoice.getPatient().getId(),
                        invoice.getPatient().getUser().getId(),
                        transaction.getId(),
                        transaction.getPaymentMethod().getName(),
                        transaction.getTransactionCode(),
                        transaction.getAmount()));
    }


    private void publishPaymentFailedEvent(Payment payment, PaymentTransaction transaction) {
        var invoice = payment.getInvoice();

        eventPublisher.publishEvent(new PaymentFailedEvent(
                        payment.getId(),
                        invoice.getId(),
                        invoice.getPatient().getId(),
                        invoice.getPatient().getUser().getId(),
                        transaction.getId(),
                        transaction.getPaymentMethod().getName(),
                        transaction.getTransactionCode(),
                        transaction.getAmount()
                )
        );
    }
}