package com.ocms.online_clinic_management_system.patient.specification;
import com.ocms.online_clinic_management_system.patient.dto.request.PatientSearchRequest;
import com.ocms.online_clinic_management_system.patient.entity.Patient;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import java.util.ArrayList;
import java.util.List;

public final class PatientSpecification {

    private PatientSpecification()
    {
    }

    public static Specification<Patient> search(PatientSearchRequest request) {

        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.hasText(request.getKeyword())) {

                String keyword = "%" + request.getKeyword().trim().toLowerCase() + "%";

                predicates.add(cb.or(
                                cb.like(cb.lower(root.get("user").get("fullName")), keyword),
                                cb.like(cb.lower(root.get("user").get("phone")), keyword),
                                cb.like(cb.lower(root.get("citizenId")), keyword)
                        ));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

}