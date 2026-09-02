package com.ocms.online_clinic_management_system.invoice.dto.response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoicePatientResponse {

    private Long id;
    private Long appointmentId;
    private LocalDateTime createdAt;
    private String doctorName;
    private String serviceName;
    private BigDecimal totalAmount;
    private String paymentStatus;
}