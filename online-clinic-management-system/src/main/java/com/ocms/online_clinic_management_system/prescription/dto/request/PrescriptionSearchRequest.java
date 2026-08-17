package com.ocms.online_clinic_management_system.prescription.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class PrescriptionSearchRequest {

    private String keyword;

    private LocalDate fromDate;

    private LocalDate toDate;
}