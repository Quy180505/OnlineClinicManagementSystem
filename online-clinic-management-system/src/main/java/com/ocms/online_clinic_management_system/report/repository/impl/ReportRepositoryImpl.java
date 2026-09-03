package com.ocms.online_clinic_management_system.report.repository.impl;
import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import com.ocms.online_clinic_management_system.common.constant.enums.Gender;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import com.ocms.online_clinic_management_system.invoice.entity.Invoice;
import com.ocms.online_clinic_management_system.medicalrecord.entity.MedicalRecord;
import com.ocms.online_clinic_management_system.patient.entity.Patient;
import com.ocms.online_clinic_management_system.payment.entity.Payment;
import com.ocms.online_clinic_management_system.payment.entity.PaymentStatus;
import com.ocms.online_clinic_management_system.report.repository.ReportRepository;
import com.ocms.online_clinic_management_system.report.repository.projection.PatientAgeProjection;
import com.ocms.online_clinic_management_system.report.repository.projection.PatientGenderProjection;
import com.ocms.online_clinic_management_system.report.repository.projection.PatientSpecialtyProjection;
import com.ocms.online_clinic_management_system.report.repository.projection.RevenueBySpecialtyProjection;
import com.ocms.online_clinic_management_system.report.repository.projection.RevenueOverviewProjection;
import com.ocms.online_clinic_management_system.report.repository.projection.impl.PatientAgeProjectionImpl;
import com.ocms.online_clinic_management_system.report.repository.projection.impl.PatientGenderProjectionImpl;
import com.ocms.online_clinic_management_system.report.repository.projection.impl.PatientSpecialtyProjectionImpl;
import com.ocms.online_clinic_management_system.report.repository.projection.impl.RevenueBySpecialtyProjectionImpl;
import com.ocms.online_clinic_management_system.report.repository.projection.impl.RevenueOverviewProjectionImpl;
import com.ocms.online_clinic_management_system.specialty.entity.Specialty;
import com.ocms.online_clinic_management_system.user.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Tuple;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ReportRepositoryImpl implements ReportRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<RevenueOverviewProjection> findMonthlyRevenue(Integer year) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Tuple> query = cb.createTupleQuery();
        Root<Invoice> invoice = query.from(Invoice.class);

        Join<Invoice, Payment> payment = invoice.join("payment", JoinType.INNER);
        Join<Payment, PaymentStatus> paymentStatus = payment.join("paymentStatus", JoinType.INNER);

        Expression<Integer> month = cb.function("MONTH", Integer.class, invoice.get("createdAt"));
        Expression<BigDecimal> revenue = cb.sum(invoice.<BigDecimal>get("totalAmount"));

        query.multiselect(month.alias("period"), revenue.alias("revenue"));

        query.where(
                cb.greaterThanOrEqualTo(invoice.get("createdAt"), getStartOfYear(year)),
                cb.lessThan(invoice.get("createdAt"), getStartOfYear(year + 1)),
                cb.equal(cb.upper(paymentStatus.get("name")), "PAID")
        );

        query.groupBy(month);
        query.orderBy(cb.asc(month));

        List<Tuple> results = entityManager.createQuery(query).getResultList();
        Map<Integer, BigDecimal> revenueByMonth = new LinkedHashMap<>();

        for (int monthValue = 1; monthValue <= 12; monthValue++) {
            revenueByMonth.put(monthValue, BigDecimal.ZERO);
        }

        for (Tuple tuple : results) {
            Integer monthValue = tuple.get("period", Integer.class);
            BigDecimal revenueValue = tuple.get("revenue", BigDecimal.class);
            revenueByMonth.put(monthValue, revenueValue != null ? revenueValue : BigDecimal.ZERO);
        }

        return revenueByMonth.entrySet().stream()
                .map(entry -> (RevenueOverviewProjection) new RevenueOverviewProjectionImpl(entry.getKey(), entry.getValue()))
                .toList();
    }

    @Override
    public List<RevenueOverviewProjection> findQuarterlyRevenue(Integer year) {

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Tuple> query = cb.createTupleQuery();
        Root<Invoice> invoice = query.from(Invoice.class);
        Join<Invoice, Payment> payment = invoice.join("payment", JoinType.INNER);
        Join<Payment, PaymentStatus> paymentStatus = payment.join("paymentStatus", JoinType.INNER);

        Expression<Integer> quarter = cb.function("QUARTER", Integer.class, invoice.get("createdAt"));
        Expression<BigDecimal> revenue = cb.sum(invoice.<BigDecimal>get("totalAmount"));

        query.multiselect(quarter.alias("period"), revenue.alias("revenue"));

        query.where(
                cb.greaterThanOrEqualTo(invoice.get("createdAt"), getStartOfYear(year)),
                cb.lessThan(invoice.get("createdAt"), getStartOfYear(year + 1)),
                cb.equal(cb.upper(paymentStatus.get("name")), "PAID")
        );

        query.groupBy(quarter);
        query.orderBy(cb.asc(quarter));

        List<Tuple> results = entityManager.createQuery(query).getResultList();
        Map<Integer, BigDecimal> revenueByQuarter = new LinkedHashMap<>();

        for (int quarterValue = 1; quarterValue <= 4; quarterValue++) {
            revenueByQuarter.put(quarterValue, BigDecimal.ZERO);
        }

        for (Tuple tuple : results) {
            Integer quarterValue = tuple.get("period", Integer.class);
            BigDecimal revenueValue = tuple.get("revenue", BigDecimal.class);
            revenueByQuarter.put(quarterValue, revenueValue != null ? revenueValue : BigDecimal.ZERO);
        }

        return revenueByQuarter.entrySet().stream()
                .map(entry -> (RevenueOverviewProjection) new RevenueOverviewProjectionImpl(entry.getKey(), entry.getValue()))
                .toList();
    }

    @Override
    public List<RevenueBySpecialtyProjection> findRevenueBySpecialty(Integer year, Integer quarter) {

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Tuple> query = cb.createTupleQuery();
        Root<Invoice> invoice = query.from(Invoice.class);
        Join<Invoice, Appointment> appointment = invoice.join("appointment", JoinType.INNER);
        Join<Appointment, Doctor> doctor = appointment.join("doctor", JoinType.INNER);
        Join<Doctor, Specialty> specialty = doctor.join("specialty", JoinType.INNER);
        Join<Invoice, Payment> payment = invoice.join("payment", JoinType.INNER);
        Join<Payment, PaymentStatus> paymentStatus = payment.join("paymentStatus", JoinType.INNER);
        Path<Long> specialtyId = specialty.get("id");
        Path<String> specialtyName = specialty.get("name");
        Expression<BigDecimal> revenue = cb.sum(invoice.<BigDecimal>get("totalAmount"));

        List<Predicate> predicates = new ArrayList<>();

        predicates.add(cb.greaterThanOrEqualTo(invoice.get("createdAt"), getStartOfYear(year)));
        predicates.add(cb.lessThan(invoice.get("createdAt"), getStartOfYear(year + 1)));
        predicates.add(cb.equal(cb.upper(paymentStatus.get("name")), "PAID"));

        if (quarter != null) {
            Expression<Integer> quarterExpression = cb.function(
                    "QUARTER",
                    Integer.class,
                    invoice.get("createdAt")
            );

            predicates.add(cb.equal(quarterExpression, quarter));
        }

        query.multiselect(specialtyId.alias("specialtyId"), specialtyName.alias("specialtyName"), revenue.alias("revenue"));
        query.where(predicates.toArray(new Predicate[0]));
        query.groupBy(specialtyId, specialtyName);
        query.orderBy(cb.desc(revenue));

        return entityManager.createQuery(query).getResultList().stream()
                .map(tuple -> (RevenueBySpecialtyProjection) new RevenueBySpecialtyProjectionImpl(
                        tuple.get("specialtyId", Long.class),
                        tuple.get("specialtyName", String.class),
                        tuple.get("revenue", BigDecimal.class)
                ))
                .toList();
    }

    @Override
    public List<PatientAgeProjection> findPatientsByAge(Integer year) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Tuple> query = cb.createTupleQuery();
        Root<MedicalRecord> medicalRecord = query.from(MedicalRecord.class);

        Join<MedicalRecord, Patient> patient = medicalRecord.join("patient", JoinType.INNER);
        Join<Patient, User> user = patient.join("user", JoinType.INNER);

        Path<LocalDate> dateOfBirth = user.get("dateOfBirth");

        LocalDate referenceDate = LocalDate.of(year, 12, 31);
        LocalDate date18 = referenceDate.minusYears(18);
        LocalDate date31 = referenceDate.minusYears(31);
        LocalDate date46 = referenceDate.minusYears(46);
        LocalDate date61 = referenceDate.minusYears(61);

        Expression<String> ageGroup = cb.<String>selectCase()
                .when(cb.isNull(dateOfBirth), "Không xác định")
                .when(cb.greaterThan(dateOfBirth, date18), "0-17")
                .when(cb.greaterThan(dateOfBirth, date31), "18-30")
                .when(cb.greaterThan(dateOfBirth, date46), "31-45")
                .when(cb.greaterThan(dateOfBirth, date61), "46-60")
                .otherwise(">60");

        Expression<Long> patientCount = cb.countDistinct(patient.get("id"));

        query.multiselect(ageGroup.alias("ageGroup"), patientCount.alias("patientCount"));

        query.where(
                cb.greaterThanOrEqualTo(medicalRecord.get("examinationDate"), getStartOfYear(year)),
                cb.lessThan(medicalRecord.get("examinationDate"), getStartOfYear(year + 1))
        );

        query.groupBy(ageGroup);

        return entityManager.createQuery(query).getResultList().stream()
                .map(tuple -> (PatientAgeProjection) new PatientAgeProjectionImpl(
                        tuple.get("ageGroup", String.class),
                        tuple.get("patientCount", Long.class)
                ))
                .toList();
    }

    @Override
    public List<PatientGenderProjection> findPatientsByGender(Integer year) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Tuple> query = cb.createTupleQuery();
        Root<MedicalRecord> medicalRecord = query.from(MedicalRecord.class);

        Join<MedicalRecord, Patient> patient = medicalRecord.join("patient", JoinType.INNER);
        Join<Patient, User> user = patient.join("user", JoinType.INNER);

        Path<Gender> gender = user.get("gender");
        Expression<Long> patientCount = cb.countDistinct(patient.get("id"));

        query.multiselect(gender, patientCount);

        query.where(
                cb.greaterThanOrEqualTo(medicalRecord.get("examinationDate"), getStartOfYear(year)),
                cb.lessThan(medicalRecord.get("examinationDate"), getStartOfYear(year + 1))
        );

        query.groupBy(gender);
        query.orderBy(cb.desc(patientCount));

        return entityManager.createQuery(query).getResultList().stream()
                .map(tuple -> {
                    Gender genderValue = tuple.get(0, Gender.class);
                    String genderName = genderValue != null ? genderValue.name() : "Bệnh nhân chưa cập nhật giới tính";

                    return (PatientGenderProjection) new PatientGenderProjectionImpl(genderName, tuple.get(1, Long.class));
                })
                .toList();
    }

    @Override
    public List<PatientSpecialtyProjection> findPatientsBySpecialty(Integer year) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Tuple> query = cb.createTupleQuery();
        Root<MedicalRecord> medicalRecord = query.from(MedicalRecord.class);

        Join<MedicalRecord, Patient> patient = medicalRecord.join("patient", JoinType.INNER);
        Join<MedicalRecord, Doctor> doctor = medicalRecord.join("doctor", JoinType.INNER);
        Join<Doctor, Specialty> specialty = doctor.join("specialty", JoinType.INNER);

        Path<Long> specialtyId = specialty.get("id");
        Path<String> specialtyName = specialty.get("name");
        Expression<Long> patientCount = cb.countDistinct(patient.get("id"));

        query.multiselect(
                specialtyId.alias("specialtyId"),
                specialtyName.alias("specialtyName"),
                patientCount.alias("patientCount")
        );

        query.where(
                cb.greaterThanOrEqualTo(medicalRecord.get("examinationDate"), getStartOfYear(year)),
                cb.lessThan(medicalRecord.get("examinationDate"), getStartOfYear(year + 1))
        );

        query.groupBy(specialtyId, specialtyName);
        query.orderBy(cb.desc(patientCount));

        return entityManager.createQuery(query).getResultList().stream()
                .map(tuple -> (PatientSpecialtyProjection) new PatientSpecialtyProjectionImpl(
                        tuple.get("specialtyId", Long.class),
                        tuple.get("specialtyName", String.class),
                        tuple.get("patientCount", Long.class)
                ))
                .toList();
    }

    private LocalDateTime getStartOfYear(Integer year) {
        return LocalDate.of(year, 1, 1).atStartOfDay();
    }
}