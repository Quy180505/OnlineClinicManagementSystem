package com.ocms.online_clinic_management_system.service.dto.request;
import com.ocms.online_clinic_management_system.common.constant.enums.MedicalServiceType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class PatchMedicalServiceRequest {

    private Long specialtyId;
    @Size(max = 150)
    private String serviceName;
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;
    @Size(max = 2000)
    private String description;
    private MedicalServiceType serviceType;
}