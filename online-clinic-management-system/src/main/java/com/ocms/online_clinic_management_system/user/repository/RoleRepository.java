package com.ocms.online_clinic_management_system.user.repository;
import com.ocms.online_clinic_management_system.user.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRoleName(String roleName);

}