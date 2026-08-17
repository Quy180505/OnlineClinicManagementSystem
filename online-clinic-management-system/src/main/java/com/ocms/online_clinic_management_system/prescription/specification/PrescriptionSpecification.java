package com.ocms.online_clinic_management_system.prescription.specification;

import com.ocms.online_clinic_management_system.prescription.entity.Prescription;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public final class PrescriptionSpecification {

    private PrescriptionSpecification() {
    }

    public static Specification<Prescription> hasPatientUserId(Long userId) {
        return (root, query, criteriaBuilder) -> userId == null ? null :
                criteriaBuilder.equal(root.get("medicalRecord").get("patient").get("user").get("id"), userId);
    }

    public static Specification<Prescription> hasDoctorId(Long doctorId) {
        return (root, query, criteriaBuilder) -> doctorId == null ? null :
                criteriaBuilder.equal(root.get("doctor").get("id"), doctorId);
    }

    public static Specification<Prescription> hasKeyword(String keyword) {
        return (root, query, criteriaBuilder) -> {

            if (keyword == null || keyword.trim().isEmpty()) {
                return null;
            }

            if (query != null) {
                query.distinct(true);
            }

            String searchKeyword = "%" + keyword.trim().toLowerCase() + "%";

            return criteriaBuilder.like(criteriaBuilder.lower
                    (root.join("details").join("medicine").get("medicineName")), searchKeyword);
        };
    }

    public static Specification<Prescription> prescriptionDateFrom(LocalDate fromDate) {
        return (root, query, criteriaBuilder) -> fromDate == null ? null :
                criteriaBuilder.greaterThanOrEqualTo(root.get("prescriptionDate"), fromDate.atStartOfDay());
    }

    public static Specification<Prescription> prescriptionDateTo(LocalDate toDate) {
        return (root, query, criteriaBuilder) -> toDate == null ? null :
                criteriaBuilder.lessThan(root.get("prescriptionDate"), toDate.plusDays(1).atStartOfDay());
    }
}