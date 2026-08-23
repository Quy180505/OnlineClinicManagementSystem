package com.ocms.online_clinic_management_system.notification.listener;
import com.ocms.online_clinic_management_system.laboratory.event.LabResultUpdatedEvent;
import com.ocms.online_clinic_management_system.laboratory.event.TestOrderCreatedEvent;
import com.ocms.online_clinic_management_system.notification.entity.Notification;
import com.ocms.online_clinic_management_system.notification.repository.NotificationRepository;
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
public class LaboratoryEventListener {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handleTestOrderCreated(TestOrderCreatedEvent event) {

        User user = getUser(event.getPatientId());

        Notification notification = Notification.builder()
                .user(user)
                .title("Có chỉ định xét nghiệm mới")
                .content("Bác sĩ đã tạo chỉ định xét nghiệm cho lần khám của bạn.")
                .notificationType("TEST_ORDER_CREATED")
                .build();

        notificationRepository.save(notification);
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handleLabResultUpdated(LabResultUpdatedEvent event) {

        User user = getUser(event.getPatientId());

        Notification notification = Notification.builder()
                .user(user)
                .title("Có kết quả xét nghiệm mới")
                .content("Kết quả xét nghiệm của bạn đã được cập nhật.")
                .notificationType("LAB_RESULT_UPDATED")
                .build();

        notificationRepository.save(notification);
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }
}