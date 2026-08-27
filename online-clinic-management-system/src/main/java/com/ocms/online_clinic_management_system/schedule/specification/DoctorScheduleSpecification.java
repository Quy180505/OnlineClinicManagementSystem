package com.ocms.online_clinic_management_system.schedule.specification;
import com.ocms.online_clinic_management_system.schedule.entity.DoctorSchedule;
import org.springframework.data.jpa.domain.Specification;
import java.time.LocalDate;
import java.time.LocalTime;

public class DoctorScheduleSpecification {

    public static Specification<DoctorSchedule> hasDoctorId(Long doctorId) {
        return (root, query, cb) -> doctorId == null ? null : cb.equal(root.get("doctor").get("id"), doctorId);
    }

    public static Specification<DoctorSchedule> hasSpecialtyId(Long specialtyId) {
        return (root, query, cb) -> specialtyId == null ? null : cb.equal(root.get("doctor").get("specialty").get("id"), specialtyId);
    }
    public static Specification<DoctorSchedule> hasWorkDate(LocalDate workDate) {
        return (root, query, cb) -> workDate == null ? null : cb.equal(root.get("workDate"), workDate);
    }

    public static Specification<DoctorSchedule> isFuture() {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        return (root, query, cb) ->
                cb.or(
                        cb.greaterThan(root.get("workDate"), today),
                        cb.and(cb.equal(root.get("workDate"), today), cb.greaterThan(root.get("endTime"), now))
                );
    }
}