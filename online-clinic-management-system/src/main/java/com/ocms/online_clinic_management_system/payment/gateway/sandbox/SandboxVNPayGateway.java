package com.ocms.online_clinic_management_system.payment.gateway.sandbox;

import com.ocms.online_clinic_management_system.payment.gateway.PaymentGateway;
import com.ocms.online_clinic_management_system.payment.gateway.PaymentGatewayRequest;
import com.ocms.online_clinic_management_system.payment.gateway.PaymentGatewayResponse;
import com.ocms.online_clinic_management_system.payment.gateway.config.VNPayProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;


@Component
@RequiredArgsConstructor
public class SandboxVNPayGateway implements PaymentGateway {

    private static final String PAYMENT_METHOD = "VNPAY";

    private static final String VERSION = "2.1.0";
    private static final String COMMAND = "pay";
    private static final String CURR_CODE = "VND";
    private static final String LOCALE = "vn";
    private static final String ORDER_TYPE = "other";

    private final VNPayProperties vnpayProperties;

    @Override
    public PaymentGatewayResponse process(PaymentGatewayRequest request) {

        String transactionCode = request.getTransactionCode();

        String paymentUrl = buildPaymentUrl(request);

        return PaymentGatewayResponse.builder()
                .success(true)
                .transactionCode(transactionCode)
                .transactionStatus("PENDING")
                .transactionTime(LocalDateTime.now())
                .message("VNPay sandbox payment URL created successfully")
                .paymentUrl(paymentUrl)
                .build();
    }

    @Override
    public boolean supports(String paymentMethod) {
        return PAYMENT_METHOD.equalsIgnoreCase(paymentMethod);
    }

    private String buildPaymentUrl(PaymentGatewayRequest request) {

        String createDate = LocalDateTime.now().atZone(ZoneId.of("Asia/Ho_Chi_Minh")).format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        String expireDate = LocalDateTime.now()
                .plusMinutes(15)
                .atZone(ZoneId.of("Asia/Ho_Chi_Minh"))
                .format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        String txnRef = request.getTransactionCode();

        long amount = request.getAmount()
                .multiply(BigDecimal.valueOf(100))
                .longValueExact();

        Map<String, String> params = new TreeMap<>();

        params.put("vnp_Version", VERSION);
        params.put("vnp_Command", COMMAND);
        params.put("vnp_TmnCode", vnpayProperties.getTmnCode());
        params.put("vnp_Amount", String.valueOf(amount));
        params.put("vnp_CurrCode", CURR_CODE);
        params.put("vnp_TxnRef", txnRef);
        params.put("vnp_OrderInfo", request.getDescription());
        params.put("vnp_OrderType", ORDER_TYPE);
        params.put("vnp_Locale", LOCALE);
        params.put("vnp_ReturnUrl", vnpayProperties.getReturnUrl());
        params.put("vnp_IpAddr", "127.0.0.1");
        params.put("vnp_CreateDate", createDate);
        params.put("vnp_ExpireDate", expireDate);

        String queryString = buildQueryString(params);

        String secureHash = hmacSHA512(vnpayProperties.getHashSecret(), queryString);

        return vnpayProperties.getPaymentUrl() + "?" + queryString + "&vnp_SecureHash=" + secureHash;
    }

    private String buildQueryString(Map<String, String> params) {

        StringBuilder query = new StringBuilder();

        for (Map.Entry<String, String> entry : params.entrySet()) {

            if (!query.isEmpty()) {
                query.append("&");
            }

            query.append(URLEncoder.encode(entry.getKey(), StandardCharsets.US_ASCII));
            query.append("=");
            query.append(URLEncoder.encode(entry.getValue(), StandardCharsets.US_ASCII));
        }

        return query.toString();
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
            throw new IllegalStateException("Failed to generate VNPay secure hash", e);
        }
    }
}