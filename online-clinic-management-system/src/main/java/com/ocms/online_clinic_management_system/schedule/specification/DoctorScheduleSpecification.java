package com.ocms.online_clinic_management_system.schedule.specification;

import com.ocms.online_clinic_management_system.schedule.entity.DoctorSchedule;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class DoctorScheduleSpecification {

    public static Specification<DoctorSchedule> hasDoctorId(Long doctorId) {
        return (root, query, cb) ->
                doctorId == null ? null : cb.equal(root.get("doctor").get("id"), doctorId);
    }

    public static Specification<DoctorSchedule> hasWorkDate(LocalDate workDate) {
        return (root, query, cb) ->
                workDate == null ? null : cb.equal(root.get("workDate"), workDate);
    }

}