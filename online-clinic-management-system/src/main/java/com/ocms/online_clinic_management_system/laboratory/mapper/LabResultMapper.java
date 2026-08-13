package com.ocms.online_clinic_management_system.laboratory.mapper;

import com.ocms.online_clinic_management_system.laboratory.dto.response.LabResultResponse;
import com.ocms.online_clinic_management_system.laboratory.entity.LabResult;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LabResultMapper {

    @Mapping(source = "testOrderDetail.id", target = "testOrderDetailId")
    @Mapping(source = "testOrderDetail.testOrder.id", target = "testOrderId")
    @Mapping(source = "testOrderDetail.testOrder.medicalRecord.id", target = "medicalRecordId")
    @Mapping(source = "testOrderDetail.service.id", target = "serviceId")
    @Mapping(source = "testOrderDetail.service.serviceName", target = "serviceName")
    LabResultResponse toResponse(LabResult labResult);
}