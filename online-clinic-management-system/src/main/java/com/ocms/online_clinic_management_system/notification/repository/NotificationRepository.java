package com.ocms.online_clinic_management_system.notification.repository;

import com.ocms.online_clinic_management_system.notification.entity.Notification;
import com.ocms.online_clinic_management_system.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUser(User user);

    List<Notification> findByUserAndIsReadFalse(User user);

}