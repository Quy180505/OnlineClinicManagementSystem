package com.ocms.online_clinic_management_system.appointment.service.impl;
import com.ocms.online_clinic_management_system.appointment.dto.request.AppointmentSearchRequest;
import com.ocms.online_clinic_management_system.appointment.dto.request.CreateAppointmentRequest;
import com.ocms.online_clinic_management_system.appointment.dto.request.RejectAppointmentRequest;
import com.ocms.online_clinic_management_system.appointment.dto.response.AppointmentDetailResponse;
import com.ocms.online_clinic_management_system.appointment.dto.response.AppointmentResponse;
import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import com.ocms.online_clinic_management_system.appointment.entity.AppointmentStatus;
import com.ocms.online_clinic_management_system.appointment.event.AppointmentCancelledEvent;
import com.ocms.online_clinic_management_system.appointment.event.AppointmentConfirmedEvent;
import com.ocms.online_clinic_management_system.appointment.event.AppointmentCreatedEvent;
import com.ocms.online_clinic_management_system.appointment.event.AppointmentRejectedEvent;
import com.ocms.online_clinic_management_system.appointment.exception.AppointmentStatusNotFoundException;
import com.ocms.online_clinic_management_system.appointment.mapper.AppointmentMapper;
import com.ocms.online_clinic_management_system.appointment.repository.AppointmentRepository;
import com.ocms.online_clinic_management_system.appointment.repository.AppointmentStatusRepository;
import com.ocms.online_clinic_management_system.appointment.service.AppointmentService;
import com.ocms.online_clinic_management_system.appointment.specification.AppointmentSpecification;
import com.ocms.online_clinic_management_system.appointment.validator.AppointmentValidator;
import com.ocms.online_clinic_management_system.auth.security.SecurityHelper;
import com.ocms.online_clinic_management_system.common.event.DomainEventPublisher;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.invoice.entity.Invoice;
import com.ocms.online_clinic_management_system.invoice.service.InvoiceService;
import com.ocms.online_clinic_management_system.medicalrecord.entity.MedicalRecord;
import com.ocms.online_clinic_management_system.medicalrecord.exception.MedicalRecordNotFoundException;
import com.ocms.online_clinic_management_system.medicalrecord.repository.MedicalRecordRepository;
import com.ocms.online_clinic_management_system.patient.entity.Patient;
import com.ocms.online_clinic_management_system.patient.repository.PatientRepository;
import com.ocms.online_clinic_management_system.patient.service.PatientService;
import com.ocms.online_clinic_management_system.schedule.entity.DoctorSchedule;
import com.ocms.online_clinic_management_system.schedule.validator.DoctorScheduleValidator;
import com.ocms.online_clinic_management_system.service.entity.MedicalService;
import com.ocms.online_clinic_management_system.service.validator.MedicalServiceValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentStatusRepository appointmentStatusRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final AppointmentMapper appointmentMapper;
    private final AppointmentValidator appointmentValidator;
    private final PatientService patientService;
    private final InvoiceService invoiceService;
    private final MedicalServiceValidator medicalServiceValidator;
    private final DoctorScheduleValidator doctorScheduleValidator;
    private final DomainEventPublisher eventPublisher;
    private final SecurityHelper securityHelper;

    @Override
    public AppointmentResponse completeByMedicalRecordId(Long medicalRecordId) {

        MedicalRecord medicalRecord = medicalRecordRepository.findById(medicalRecordId).orElseThrow(MedicalRecordNotFoundException::new);
        Appointment appointment = medicalRecord.getAppointment();
        appointmentValidator.validateStatusTransition(appointment, "COMPLETED");
        AppointmentStatus completedStatus = getStatusByName("COMPLETED");
        appointment.setAppointmentStatus(completedStatus);

        return appointmentMapper.toResponse(appointment);
    }
    @Override
    public AppointmentResponse create(CreateAppointmentRequest request) {

        Patient patient = patientService.getCurrentPatient();
        MedicalService medicalService = medicalServiceValidator.validateMedicalServiceExists(request.getServiceId());
        DoctorSchedule schedule = doctorScheduleValidator.validateScheduleExists(request.getScheduleId());

        appointmentValidator.validateServiceIsExam(medicalService);
        appointmentValidator.validateScheduleAvailable(schedule);
        appointmentValidator.validateScheduleCapacity(schedule);
        appointmentValidator.validateServiceBelongsToDoctor(medicalService, schedule);
        appointmentValidator.validateAppointmentNotExists(patient.getId(), schedule.getId());

        Appointment appointment = appointmentMapper.toEntity(request);
        appointment.setPatient(patient);
        appointment.setDoctor(schedule.getDoctor());
        appointment.setService(medicalService);
        appointment.setSchedule(schedule);

        AppointmentStatus pendingStatus = getStatusByName("PENDING");
        appointment.setAppointmentStatus(pendingStatus);
        appointment = appointmentRepository.save(appointment);
        invoiceService.createInitialInvoice(appointment);
        eventPublisher.publish(new AppointmentCreatedEvent(appointment.getId(), appointment.getPatient().getId(),
                        appointment.getDoctor().getId(), appointment.getService().getId(),
                      appointment.getSchedule().getId() , appointment.getPatient().getUser().getId()
                ));


        return appointmentMapper.toResponse(appointment);
    }

    @Override
    @Transactional(readOnly = true)
    public AppointmentDetailResponse getById(Long appointmentId) {

        Appointment appointment = appointmentValidator.validateAppointmentExists(appointmentId);

        if (securityHelper.isPatient()) {
            Patient patient = patientService.getCurrentPatient();

            appointmentValidator.validatePatientOwnership(appointment, patient.getId());
        }

        AppointmentDetailResponse response = appointmentMapper.toDetailResponse(appointment);
        Invoice invoice = invoiceService.getByAppointmentId(appointmentId);
        response.setInvoice(AppointmentDetailResponse.InvoiceInfo.builder().id(invoice.getId()).totalAmount(invoice.getTotalAmount()).build());

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<AppointmentResponse> search(AppointmentSearchRequest request, Pageable pageable) {
        AppointmentStatus pendingStatus = getStatusByName("PENDING");
        Specification<Appointment> specification = Specification.allOf(
                        AppointmentSpecification.hasPatientId(request.getPatientId()),
                        AppointmentSpecification.hasDoctorId(request.getDoctorId()),
                        AppointmentSpecification.hasServiceId(request.getServiceId()),
                        AppointmentSpecification.hasAppointmentStatusId(pendingStatus.getId()),
                        AppointmentSpecification.scheduleDateFrom(request.getFromDate()),
                        AppointmentSpecification.scheduleDateTo(request.getToDate())
                );

        Page<AppointmentResponse> responsePage = appointmentRepository.findAll(specification, pageable).map(appointmentMapper::toResponse);

        return PageResponse.of(responsePage);
    }

    @Override
    public AppointmentResponse confirm(Long appointmentId) {

        Appointment appointment = appointmentValidator.validateAppointmentExists(appointmentId);
        appointmentValidator.validateStatusTransition(appointment, "CONFIRMED");
        AppointmentStatus confirmedStatus = getStatusByName("CONFIRMED");
        appointment.setAppointmentStatus(confirmedStatus);

        eventPublisher.publish(new AppointmentConfirmedEvent(appointment.getId(), appointment.getPatient().getId(),
                                                            appointment.getPatient().getUser().getId(),
                                                            appointment.getDoctor().getId()
                ));

        return appointmentMapper.toResponse(appointment);
    }

    @Override
    public AppointmentResponse reject(Long appointmentId, RejectAppointmentRequest request) {

        Appointment appointment = appointmentValidator.validateAppointmentExists(appointmentId);
        appointmentValidator.validateStatusTransition(appointment, "REJECTED");
        AppointmentStatus rejectedStatus = getStatusByName("REJECTED");
        appointment.setAppointmentStatus(rejectedStatus);

        eventPublisher.publish(new AppointmentRejectedEvent(appointment.getId(), appointment.getPatient().getId(),
                                                            appointment.getDoctor().getId(),
                                                            appointment.getPatient().getUser().getId(), request.getReason()
                ));
        return appointmentMapper.toResponse(appointment);
    }

    @Override
    public AppointmentResponse cancel(Long appointmentId) {

        Appointment appointment = appointmentValidator.validateAppointmentExists(appointmentId);


        if (securityHelper.isPatient()) {
            Patient patient = patientService.getCurrentPatient();
            appointmentValidator.validatePatientOwnership(appointment, patient.getId());
        }
        appointmentValidator.validateCancellation(appointment);
        AppointmentStatus cancelledStatus = getStatusByName("CANCELLED");
        appointment.setAppointmentStatus(cancelledStatus);

        eventPublisher.publish(new AppointmentCancelledEvent(appointment.getId(), appointment.getPatient().getId(),
                                                                appointment.getPatient().getUser().getId(),
                                                                    appointment.getDoctor().getId()
                ));

        return appointmentMapper.toResponse(appointment);
    }

    private AppointmentStatus getStatusByName(String statusName) {
        return appointmentStatusRepository.findByName(statusName).orElseThrow(AppointmentStatusNotFoundException::new);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<AppointmentResponse> getMyAppointments(AppointmentSearchRequest request, Pageable pageable) {
        Patient patient = patientService.getCurrentPatient();



        Specification<Appointment> specification = Specification.allOf(
                AppointmentSpecification.hasPatientId(patient.getId()),
                AppointmentSpecification.hasServiceId(request.getServiceId()),
                AppointmentSpecification.hasAppointmentStatusId(request.getAppointmentStatusId()),
                AppointmentSpecification.scheduleDateFrom(request.getFromDate()),
                AppointmentSpecification.scheduleDateTo(request.getToDate())
        );

        Page<AppointmentResponse> responsePage = appointmentRepository.findAll(specification, pageable).map(appointmentMapper::toResponse);

        return PageResponse.of(responsePage);
    }
}