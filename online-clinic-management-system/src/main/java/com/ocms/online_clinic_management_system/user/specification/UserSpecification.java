package com.ocms.online_clinic_management_system.user.specification;
import com.ocms.online_clinic_management_system.common.constant.enums.UserStatus;
import com.ocms.online_clinic_management_system.user.entity.User;
import org.springframework.data.jpa.domain.Specification;

public final class UserSpecification {

    private UserSpecification() {
    }

    public static Specification<User> keyword(String keyword) {

        return (root, query, cb) -> {

            if (keyword == null || keyword.isBlank()) {
                return cb.conjunction();
            }

            String pattern = "%" + keyword.toLowerCase() + "%";

            return cb.or(
                    cb.like(cb.lower(root.get("username")), pattern),
                    cb.like(cb.lower(root.get("fullName")), pattern),
                    cb.like(cb.lower(root.get("email")), pattern)
            );

        };

    }

    public static Specification<User> role(String roleName) {

        return (root, query, cb) -> {

            if (roleName == null || roleName.isBlank()) {
                return cb.conjunction();
            }

            return cb.equal(root.get("role").get("roleName"), roleName);

        };

    }

    public static Specification<User> status(UserStatus status) {

        return (root, query, cb) -> {

            if (status == null) {
                return cb.conjunction();
            }

            return cb.equal(root.get("status"), status);

        };

    }

}