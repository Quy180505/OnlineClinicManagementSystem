package com.ocms.online_clinic_management_system.chat.repository;
import com.ocms.online_clinic_management_system.chat.entity.ChatRoom;
import com.ocms.online_clinic_management_system.common.constant.enums.ChatRoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long>, JpaSpecificationExecutor<ChatRoom> {

    List<ChatRoom> findByPatient_Id(Long patientId);
    List<ChatRoom> findByDoctor_Id(Long doctorId);
    List<ChatRoom> findByPatient_IdAndStatus(Long patientId, ChatRoomStatus status);
    List<ChatRoom> findByDoctor_IdAndStatus(Long doctorId, ChatRoomStatus status);
    Optional<ChatRoom> findByPatient_IdAndDoctor_Id(Long patientId, Long doctorId);
    boolean existsByPatient_IdAndDoctor_Id(Long patientId, Long doctorId);
    boolean existsByIdAndPatient_Id(Long roomId, Long patientId);
    boolean existsByIdAndDoctor_Id(Long roomId, Long doctorId);
}