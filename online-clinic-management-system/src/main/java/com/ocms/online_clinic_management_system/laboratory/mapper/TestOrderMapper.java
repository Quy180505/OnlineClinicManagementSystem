package com.ocms.online_clinic_management_system.laboratory.mapper;

import com.ocms.online_clinic_management_system.laboratory.dto.response.TestOrderDetailResponse;
import com.ocms.online_clinic_management_system.laboratory.dto.response.TestOrderResponse;
import com.ocms.online_clinic_management_system.laboratory.entity.TestOrder;
import com.ocms.online_clinic_management_system.laboratory.entity.TestOrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TestOrderMapper {

    @Mapping(source = "medicalRecord.id", target = "medicalRecordId")
    @Mapping(source = "doctor.id", target = "doctorId")
    @Mapping(source = "status", target = "status")
    TestOrderResponse toResponse(TestOrder testOrder);

    List<TestOrderResponse> toResponseList(List<TestOrder> testOrders);

    @Mapping(source = "testOrder.id", target = "testOrderId")
    @Mapping(source = "service.id", target = "serviceId")
    @Mapping(source = "service.serviceName", target = "serviceName")
    @Mapping(target = "resultAvailable", expression = "java(testOrderDetail.getLabResult() != null)")
    TestOrderDetailResponse toDetailResponse(TestOrderDetail testOrderDetail);

    List<TestOrderDetailResponse> toDetailResponseList(List<TestOrderDetail> details);
}