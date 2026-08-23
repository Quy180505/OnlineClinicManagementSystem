package com.ocms.online_clinic_management_system.laboratory.mapper;
import com.ocms.online_clinic_management_system.laboratory.dto.response.LabResultResponse;
import com.ocms.online_clinic_management_system.laboratory.dto.response.PatientLabResultDetailResponse;
import com.ocms.online_clinic_management_system.laboratory.dto.response.PatientLabResultResponse;
import com.ocms.online_clinic_management_system.laboratory.entity.LabResult;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring")
public interface LabResultMapper {

    @Mapping(source = "testOrderDetail.id", target = "testOrderDetailId")
    @Mapping(source = "testOrderDetail.testOrder.id", target = "testOrderId")
    @Mapping(source = "testOrderDetail.testOrder.medicalRecord.id", target = "medicalRecordId")
    @Mapping(source = "testOrderDetail.service.id", target = "serviceId")
    @Mapping(source = "testOrderDetail.service.serviceName", target = "serviceName")
    LabResultResponse toResponse(LabResult labResult);

    @Mapping(target = "labResultId", source = "id")
    @Mapping(target = "testOrderDetailId", source = "testOrderDetail.id")
    @Mapping(target = "testOrderId", source = "testOrderDetail.testOrder.id")
    @Mapping(target = "medicalRecordId", source = "testOrderDetail.testOrder.medicalRecord.id")
    @Mapping(target = "serviceName", source = "testOrderDetail.service.serviceName")
    @Mapping(target = "resultDate", source = "resultDate")
    PatientLabResultResponse toPatientLabResultResponse(LabResult labResult);

    List<PatientLabResultResponse> toPatientLabResultResponseList(List<LabResult> labResults);

    @Mapping(target = "labResultId", source = "id")
    @Mapping(target = "testOrderDetailId", source = "testOrderDetail.id")
    @Mapping(target = "testOrderId", source = "testOrderDetail.testOrder.id")
    @Mapping(target = "medicalRecordId", source = "testOrderDetail.testOrder.medicalRecord.id")
    @Mapping(target = "serviceName", source = "testOrderDetail.service.serviceName")
    @Mapping(target = "resultContent", source = "resultContent")
    @Mapping(target = "resultDate", source = "resultDate")
    PatientLabResultDetailResponse toPatientLabResultDetailResponse(LabResult labResult);

}