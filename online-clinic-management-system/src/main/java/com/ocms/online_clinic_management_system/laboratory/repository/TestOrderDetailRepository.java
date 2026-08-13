package com.ocms.online_clinic_management_system.laboratory.repository;

import com.ocms.online_clinic_management_system.laboratory.entity.TestOrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestOrderDetailRepository extends JpaRepository<TestOrderDetail, Long> {

    List<TestOrderDetail> findByTestOrderId(Long testOrderId);

    boolean existsByIdAndTestOrderId(Long detailId, Long testOrderId);
    boolean existsByTestOrderIdAndLabResultIsNull(Long testOrderId);

}