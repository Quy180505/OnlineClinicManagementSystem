package com.ocms.online_clinic_management_system.notification.listener;

import com.ocms.online_clinic_management_system.notification.entity.Notification;
import com.ocms.online_clinic_management_system.notification.repository.NotificationRepository;
import com.ocms.online_clinic_management_system.payment.event.PaymentCompletedEvent;
import com.ocms.online_clinic_management_system.payment.event.PaymentFailedEvent;
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
public class PaymentEventListener {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handlePaymentCompleted(PaymentCompletedEvent event) {

        User user = getUser(event.getPatientUserId());

        Notification notification = Notification.builder()
                .user(user)
                .title("Thanh toán thành công")
                .content("Hóa đơn đã được thanh toán thành công.")
                .notificationType("PAYMENT_COMPLETED")
                .build();

        notificationRepository.save(notification);
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handlePaymentFailed(PaymentFailedEvent event) {

        User user = getUser(event.getPatientUserId());

        Notification notification = Notification.builder()
                .user(user)
                .title("Thanh toán không thành công")
                .content("Thanh toán hóa đơn không thành công. Bạn có thể thực hiện thanh toán lại.")
                .notificationType("PAYMENT_FAILED")
                .build();

        notificationRepository.save(notification);
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }
}