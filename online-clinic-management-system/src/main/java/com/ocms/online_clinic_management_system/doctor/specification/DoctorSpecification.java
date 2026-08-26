package com.ocms.online_clinic_management_system.doctor.specification;

import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import com.ocms.online_clinic_management_system.user.entity.User;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

public class DoctorSpecification {

    public static Specification<Doctor> keywordContains(String keyword) {
        return (root, query, cb) -> {

            if (keyword == null || keyword.isBlank()) {
                return null;
            }

            Join<Doctor, User> user = root.join("user");
            String pattern = "%" + keyword.trim().toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(user.get("fullName")), pattern),
                    cb.like(cb.lower(user.get("email")), pattern),
                    cb.like(cb.lower(user.get("phone")), pattern)
            );
        };
    }
}