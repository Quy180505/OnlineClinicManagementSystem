package com.ocms.online_clinic_management_system.notification.listener;
import com.ocms.online_clinic_management_system.notification.entity.Notification;
import com.ocms.online_clinic_management_system.notification.repository.NotificationRepository;
import com.ocms.online_clinic_management_system.prescription.event.PrescriptionCreatedEvent;
import com.ocms.online_clinic_management_system.user.entity.User;
import com.ocms.online_clinic_management_system.user.exception.UserNotFoundException;
import com.ocms.online_clinic_management_system.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class PrescriptionEventListener {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handlePrescriptionCreated(PrescriptionCreatedEvent event) {

        User user = getUser(event.getPatientUserId());

        Notification notification = Notification.builder()
                .user(user)
                .title("Đơn thuốc mới")
                .content("Bác sĩ đã kê đơn thuốc cho lần khám của bạn.")
                .notificationType("PRESCRIPTION_CREATED")
                .build();

        notificationRepository.save(notification);
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }
}