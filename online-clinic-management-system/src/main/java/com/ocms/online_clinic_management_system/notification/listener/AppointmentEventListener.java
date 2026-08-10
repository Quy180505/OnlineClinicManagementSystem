package com.ocms.online_clinic_management_system.notification.listener;

import com.ocms.online_clinic_management_system.appointment.event.AppointmentCancelledEvent;
import com.ocms.online_clinic_management_system.appointment.event.AppointmentConfirmedEvent;
import com.ocms.online_clinic_management_system.appointment.event.AppointmentCreatedEvent;
import com.ocms.online_clinic_management_system.appointment.event.AppointmentRejectedEvent;
import com.ocms.online_clinic_management_system.notification.entity.Notification;
import com.ocms.online_clinic_management_system.notification.repository.NotificationRepository;
import com.ocms.online_clinic_management_system.user.entity.User;
import com.ocms.online_clinic_management_system.user.exception.UserNotFoundException;
import com.ocms.online_clinic_management_system.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class AppointmentEventListener {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @EventListener
    @Transactional
    public void handleAppointmentCreated(AppointmentCreatedEvent event) {

        User user = getUser(event.getPatientUserId());

        Notification notification = Notification.builder()
                .user(user)
                .title("Đặt lịch khám thành công")
                .content("Lịch khám của bạn đã được tạo và đang chờ xác nhận.")
                .notificationType("APPOINTMENT_CREATED")
                .build();

        notificationRepository.save(notification);
    }

    @EventListener
    @Transactional
    public void handleAppointmentConfirmed(AppointmentConfirmedEvent event) {

        User user = getUser(event.getPatientUserId());

        Notification notification = Notification.builder()
                .user(user)
                .title("Lịch khám đã được xác nhận")
                .content("Lịch khám của bạn đã được nhân viên xác nhận.")
                .notificationType("APPOINTMENT_CONFIRMED")
                .build();

        notificationRepository.save(notification);
    }

    @EventListener
    @Transactional
    public void handleAppointmentRejected(AppointmentRejectedEvent event) {

        User user = getUser(event.getPatientUserId());

        Notification notification = Notification.builder()
                .user(user)
                .title("Lịch khám bị từ chối")
                .content("Lịch khám của bạn đã bị từ chối.")
                .notificationType("APPOINTMENT_REJECTED")
                .build();

        notificationRepository.save(notification);
    }

    @EventListener
    @Transactional
    public void handleAppointmentCancelled(AppointmentCancelledEvent event) {

        User user = getUser(event.getPatientUserId());

        Notification notification = Notification.builder()
                .user(user)
                .title("Lịch khám đã được hủy")
                .content("Lịch khám của bạn đã được hủy.")
                .notificationType("APPOINTMENT_CANCELLED")
                .build();

        notificationRepository.save(notification);
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }
}