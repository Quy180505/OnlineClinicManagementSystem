package com.ocms.online_clinic_management_system.schedule.dto.response;
import com.ocms.online_clinic_management_system.common.constant.enums.ScheduleStatus;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
public class DoctorScheduleDetailResponse {

    private Long id;
    private Long doctorId;
    private String doctorName;
    private LocalDate workDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer maxPatients;
    private ScheduleStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}