package com.ocms.online_clinic_management_system.chat.validator;
import com.ocms.online_clinic_management_system.chat.entity.ChatMessage;
import com.ocms.online_clinic_management_system.chat.entity.ChatRoom;
import com.ocms.online_clinic_management_system.chat.exception.ChatAccessDeniedException;
import com.ocms.online_clinic_management_system.chat.exception.ChatMessageNotFoundException;
import com.ocms.online_clinic_management_system.chat.exception.ChatRoomAlreadyExistsException;
import com.ocms.online_clinic_management_system.chat.exception.ChatRoomNotFoundException;
import com.ocms.online_clinic_management_system.chat.exception.InvalidChatRoomStatusException;
import com.ocms.online_clinic_management_system.chat.repository.ChatMessageRepository;
import com.ocms.online_clinic_management_system.chat.repository.ChatRoomRepository;
import com.ocms.online_clinic_management_system.common.constant.enums.ChatRoomStatus;
import com.ocms.online_clinic_management_system.medicalrecord.repository.MedicalRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChatValidator {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final MedicalRecordRepository medicalRecordRepository;

    public ChatRoom validateChatRoomExists(Long roomId) {
        return chatRoomRepository.findById(roomId).orElseThrow(ChatRoomNotFoundException::new);
    }

    public ChatMessage validateChatMessageExists(Long messageId) {
        return chatMessageRepository.findById(messageId).orElseThrow(ChatMessageNotFoundException::new);
    }

    public void validateChatRoomNotExists(Long patientId, Long doctorId) {
        if (chatRoomRepository.existsByPatient_IdAndDoctor_Id(patientId, doctorId)) {
            throw new ChatRoomAlreadyExistsException();
        }
    }

    public void validatePatientDoctorRelationship(Long patientId, Long doctorId) {
        if (!medicalRecordRepository.existsByPatient_IdAndDoctor_Id(patientId, doctorId)) {
            throw new ChatAccessDeniedException();
        }
    }

    public void validatePatientAccess(ChatRoom chatRoom, Long patientId) {
        if (!chatRoom.getPatient().getId().equals(patientId)) {
            throw new ChatAccessDeniedException();
        }
    }

    public void validateDoctorAccess(ChatRoom chatRoom, Long doctorId) {
        if (!chatRoom.getDoctor().getId().equals(doctorId)) {
            throw new ChatAccessDeniedException();
        }
    }

    public void validateChatRoomAccess(ChatRoom chatRoom, Long userId) {

        Long patientUserId = chatRoom.getPatient().getUser().getId();
        Long doctorUserId = chatRoom.getDoctor().getUser().getId();

        if (!patientUserId.equals(userId) && !doctorUserId.equals(userId)) {
            throw new ChatAccessDeniedException();
        }
    }

    public void validateMessageBelongsToRoom(ChatMessage chatMessage, Long roomId) {

        if (!chatMessage.getChatRoom().getId().equals(roomId)) {
            throw new ChatAccessDeniedException();
        }
    }

    public void validateMessageSender(ChatMessage chatMessage, Long userId) {

        if (!chatMessage.getSender().getId().equals(userId)) {
            throw new ChatAccessDeniedException();
        }
    }

    public void validateChatRoomOpen(ChatRoom chatRoom) {
        if (chatRoom.getStatus() != ChatRoomStatus.OPEN) {
            throw new InvalidChatRoomStatusException();
        }
    }

    public void validateChatRoomCanClose(ChatRoom chatRoom) {
        if (chatRoom.getStatus() != ChatRoomStatus.OPEN) {
            throw new InvalidChatRoomStatusException();
        }
    }

    public void validateChatRoomCanOpen(ChatRoom chatRoom) {
        if (chatRoom.getStatus() != ChatRoomStatus.CLOSED) {
            throw new InvalidChatRoomStatusException();
        }
    }
}