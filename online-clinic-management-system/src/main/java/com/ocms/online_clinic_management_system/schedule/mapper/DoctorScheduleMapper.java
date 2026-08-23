package com.ocms.online_clinic_management_system.schedule.mapper;
import com.ocms.online_clinic_management_system.schedule.dto.request.CreateDoctorScheduleRequest;
import com.ocms.online_clinic_management_system.schedule.dto.request.UpdateDoctorScheduleRequest;
import com.ocms.online_clinic_management_system.schedule.dto.response.DoctorScheduleDetailResponse;
import com.ocms.online_clinic_management_system.schedule.dto.response.DoctorScheduleResponse;
import com.ocms.online_clinic_management_system.schedule.entity.DoctorSchedule;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface DoctorScheduleMapper {

    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "appointments", ignore = true)
    @Mapping(target = "status", ignore = true)
    DoctorSchedule toEntity(CreateDoctorScheduleRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(UpdateDoctorScheduleRequest request, @MappingTarget DoctorSchedule schedule);

    @Mapping(target = "doctorId", source = "doctor.id")
    @Mapping(target = "doctorName", source = "doctor.user.fullName")
    DoctorScheduleResponse toResponse(DoctorSchedule schedule);

    @Mapping(target = "doctorId", source = "doctor.id")
    @Mapping(target = "doctorName", source = "doctor.user.fullName")
    DoctorScheduleDetailResponse toDetailResponse(DoctorSchedule schedule);

}