package com.ocms.online_clinic_management_system.appointment.entity;

import com.ocms.online_clinic_management_system.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "appointment_status")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class AppointmentStatus extends BaseEntity {

    @Column(nullable = false, unique = true, length = 40)
    private String name;

    @OneToMany(mappedBy = "appointmentStatus", fetch = FetchType.LAZY)
    private List<Appointment> appointments = new ArrayList<>();
}