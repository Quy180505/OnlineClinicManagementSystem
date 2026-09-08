package com.ocms.online_clinic_management_system.chat.service.impl;
import com.ocms.online_clinic_management_system.auth.security.SecurityHelper;
import com.ocms.online_clinic_management_system.chat.dto.request.CreateChatRoomRequest;
import com.ocms.online_clinic_management_system.chat.dto.response.ChatRoomDetailResponse;
import com.ocms.online_clinic_management_system.chat.dto.response.ChatRoomResponse;
import com.ocms.online_clinic_management_system.chat.entity.ChatRoom;
import com.ocms.online_clinic_management_system.chat.exception.ChatAccessDeniedException;
import com.ocms.online_clinic_management_system.chat.mapper.ChatMapper;
import com.ocms.online_clinic_management_system.chat.repository.ChatRoomRepository;
import com.ocms.online_clinic_management_system.chat.service.ChatRoomService;
import com.ocms.online_clinic_management_system.chat.validator.ChatValidator;
import com.ocms.online_clinic_management_system.common.constant.enums.ChatRoomStatus;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import com.ocms.online_clinic_management_system.doctor.exception.DoctorNotFoundException;
import com.ocms.online_clinic_management_system.doctor.repository.DoctorRepository;
import com.ocms.online_clinic_management_system.patient.entity.Patient;
import com.ocms.online_clinic_management_system.patient.exception.PatientNotFoundException;
import com.ocms.online_clinic_management_system.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMapper chatMapper;
    private final ChatValidator chatValidator;
    private final SecurityHelper securityHelper;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    @Override
    @Transactional
    public ChatRoomResponse createChatRoom(CreateChatRoomRequest request) {

        Long currentUserId = securityHelper.getCurrentUserId();
        Patient patient = patientRepository.findByUserId(currentUserId).orElseThrow(PatientNotFoundException::new);
        Doctor doctor = doctorRepository.findById(request.getDoctorId()).orElseThrow(DoctorNotFoundException::new);

        chatValidator.validatePatientDoctorRelationship(patient.getId(), doctor.getId());
        ChatRoom chatRoom = chatRoomRepository.findByPatient_IdAndDoctor_Id(patient.getId(), doctor.getId())
                .orElseGet(() -> {
                 ChatRoom newChatRoom = ChatRoom.builder().patient(patient).doctor(doctor).status(ChatRoomStatus.OPEN).build();
                            return chatRoomRepository.save(newChatRoom);
                        });

        return chatMapper.toChatRoomResponse(chatRoom);
    }

    @Override
    public List<ChatRoomResponse> getMyChatRooms() {

        Long currentUserId = securityHelper.getCurrentUserId();

        if (securityHelper.isPatient()) {
            Patient patient = patientRepository.findByUserId(currentUserId).orElseThrow(PatientNotFoundException::new);
            List<ChatRoom> chatRooms = chatRoomRepository.findByPatient_Id(patient.getId());
            return chatMapper.toChatRoomResponseList(chatRooms);
        }

        if (securityHelper.isDoctor()) {
            Doctor doctor = doctorRepository.findByUserId(currentUserId).orElseThrow(DoctorNotFoundException::new);
            List<ChatRoom> chatRooms = chatRoomRepository.findByDoctor_Id(doctor.getId());
            return chatMapper.toChatRoomResponseList(chatRooms);
        }

        throw new ChatAccessDeniedException();
    }

    @Override
    public ChatRoomDetailResponse getChatRoomDetail(Long roomId) {
        Long currentUserId = securityHelper.getCurrentUserId();
        ChatRoom chatRoom = chatValidator.validateChatRoomExists(roomId);
        chatValidator.validateChatRoomAccess(chatRoom, currentUserId);
        return chatMapper.toChatRoomDetailResponse(chatRoom);
    }

    @Override
    @Transactional
    public ChatRoomResponse closeChatRoom(Long roomId) {

        Long currentUserId = securityHelper.getCurrentUserId();
        ChatRoom chatRoom = chatValidator.validateChatRoomExists(roomId);

        chatValidator.validateChatRoomAccess(chatRoom, currentUserId);
        chatValidator.validateChatRoomCanClose(chatRoom);
        chatRoom.setStatus(ChatRoomStatus.CLOSED);

        return chatMapper.toChatRoomResponse(chatRoom);
    }

    @Override
    @Transactional
    public ChatRoomResponse openChatRoom(Long roomId) {

        Long currentUserId = securityHelper.getCurrentUserId();
        ChatRoom chatRoom = chatValidator.validateChatRoomExists(roomId);
        chatValidator.validateChatRoomAccess(chatRoom, currentUserId);
        chatValidator.validateChatRoomCanOpen(chatRoom);
        chatRoom.setStatus(ChatRoomStatus.OPEN);

        return chatMapper.toChatRoomResponse(chatRoom);
    }
}