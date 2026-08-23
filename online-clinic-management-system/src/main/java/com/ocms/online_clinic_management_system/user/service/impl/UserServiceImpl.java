package com.ocms.online_clinic_management_system.user.service.impl;
import com.ocms.online_clinic_management_system.common.event.DomainEventPublisher;
import com.ocms.online_clinic_management_system.common.util.PasswordUtil;
import com.ocms.online_clinic_management_system.doctor.service.DoctorService;
import com.ocms.online_clinic_management_system.staff.service.StaffService;
import com.ocms.online_clinic_management_system.user.dto.request.*;
import com.ocms.online_clinic_management_system.user.dto.response.*;
import com.ocms.online_clinic_management_system.user.entity.Role;
import com.ocms.online_clinic_management_system.user.entity.User;
import com.ocms.online_clinic_management_system.user.event.*;
import com.ocms.online_clinic_management_system.user.exception.UserNotFoundException;
import com.ocms.online_clinic_management_system.user.mapper.UserMapper;
import com.ocms.online_clinic_management_system.user.repository.RoleRepository;
import com.ocms.online_clinic_management_system.user.repository.UserRepository;
import com.ocms.online_clinic_management_system.user.service.UserService;
import com.ocms.online_clinic_management_system.user.specification.UserSpecification;
import com.ocms.online_clinic_management_system.user.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final UserValidator validator;
    private final DoctorService doctorService;
    private final StaffService staffService;
    private final DomainEventPublisher eventPublisher;
    private final PasswordUtil passwordUtil;

    @Override
    public UserResponse createDoctor(CreateDoctorRequest request) {
        validator.validateCreateDoctor(request);

        Role role = roleRepository.findByRoleName("ROLE_DOCTOR").orElseThrow();
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordUtil.encode(request.getPassword()))
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .role(role)
                .build();
        User savedUser = userRepository.save(user);
        doctorService.createDoctor(savedUser, request.getSpecialtyId(), request.getDegree(),request.getExperienceYears());
        eventPublisher.publish(new UserCreatedEvent(savedUser.getId(), savedUser.getUsername(), role.getRoleName()));

        return userMapper.toUserResponse(savedUser);
    }

    @Override
    public UserResponse createStaff(CreateStaffRequest request) {

        validator.validateCreateStaff(request);
        Role role = roleRepository.findByRoleName("ROLE_STAFF").orElseThrow();

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordUtil.encode(request.getPassword()))
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .role(role)
                .build();

        User savedUser = userRepository.save(user);
        staffService.createStaff(savedUser, request.getPosition());
        eventPublisher.publish(new UserCreatedEvent(savedUser.getId(), savedUser.getUsername(), role.getRoleName()));

        return userMapper.toUserResponse(savedUser);
    }

    @Override
    public UserDetailResponse updateUser(Long userId, UpdateUserRequest request){
        User user=findEntity(userId);
        userMapper.updateUserFromRequest(request, user);

        return userMapper.toUserDetailResponse(user);
    }

    @Override
    public UserDetailResponse updateRole(Long userId, UpdateUserRoleRequest request){

        User user=findEntity(userId);
        String oldRole = user.getRole().getRoleName();

        Role newRole = roleRepository.findByRoleName(request.getRoleName()).orElseThrow();
        user.setRole(newRole);
        eventPublisher.publish(new UserRoleChangedEvent(userId, oldRole, newRole.getRoleName()));

        return userMapper.toUserDetailResponse(user);
    }

    @Override
    public UserDetailResponse updateStatus(Long userId, UpdateUserStatusRequest request){

        User user=findEntity(userId);

        user.setStatus(request.getStatus());

        if(request.getStatus().name().equals("LOCKED")){
            eventPublisher.publish(new UserLockedEvent(userId));
        }

        if(request.getStatus().name().equals("ACTIVE")){
            eventPublisher.publish(new UserUnlockedEvent(userId));
        }
        return userMapper.toUserDetailResponse(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetailResponse findById(Long userId){
        return userMapper.toUserDetailResponse(findEntity(userId));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserSummaryResponse> search(UserSearchRequest request){
        Specification<User> spec = Specification.allOf(
                UserSpecification.keyword(request.getKeyword()),
                UserSpecification.role(request.getRoleName()),
                UserSpecification.status(request.getStatus())
        );

        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());

        return userRepository.findAll(spec,pageable).map(userMapper::toUserSummaryResponse);
    }

    private User findEntity(Long id){
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }


}