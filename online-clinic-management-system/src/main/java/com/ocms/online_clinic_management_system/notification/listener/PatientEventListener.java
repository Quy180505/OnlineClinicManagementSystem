package com.ocms.online_clinic_management_system.notification.listener;
import com.ocms.online_clinic_management_system.notification.entity.Notification;
import com.ocms.online_clinic_management_system.notification.repository.NotificationRepository;
import com.ocms.online_clinic_management_system.patient.event.PatientUpdateEvent;
import com.ocms.online_clinic_management_system.user.entity.User;
import com.ocms.online_clinic_management_system.user.exception.UserNotFoundException;
import com.ocms.online_clinic_management_system.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class PatientEventListener {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handlePatientUpdated(PatientUpdateEvent event) {

        User user = userRepository.findById(event.getUserId()).orElseThrow(UserNotFoundException::new);

        Notification notification = Notification.builder()
                .user(user)
                .title("Profile updated")
                .content("Your profile has been updated successfully.")
                .notificationType("PATIENT_PROFILE")
                .build();

        notificationRepository.save(notification);
    }
}