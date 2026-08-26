package com.ocms.online_clinic_management_system.service.specification;
import com.ocms.online_clinic_management_system.common.constant.enums.MedicalServiceType;
import com.ocms.online_clinic_management_system.service.entity.MedicalService;
import org.springframework.data.jpa.domain.Specification;

public final class MedicalServiceSpecification {

    private MedicalServiceSpecification() {
    }

    public static Specification<MedicalService> hasServiceName(String keyword) {

        return (root, query, criteriaBuilder) -> {

            if (keyword == null || keyword.isBlank()) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.like(criteriaBuilder.lower(root.get("serviceName")), "%" + keyword.toLowerCase() + "%");
        };
    }

    public static Specification<MedicalService> hasSpecialty(Long specialtyId) {

        return (root, query, criteriaBuilder) -> {
            if (specialtyId == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("specialty").get("id"), specialtyId);
        };
    }

    public static Specification<MedicalService> hasServiceType(MedicalServiceType serviceType) {

        return (root, query, criteriaBuilder) -> {
            if (serviceType == null) {
                return null;
            }

            return criteriaBuilder.equal(root.get("serviceType"), serviceType);
        };
    }

}