package com.ocms.online_clinic_management_system.auth.security;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityHelper {

    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public UserPrincipal getCurrentPrincipal() {
        Authentication authentication = getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof UserPrincipal principal)) {
            return null;
        }

        return principal;
    }

    public Long getCurrentUserId() {
        UserPrincipal principal = getCurrentPrincipal();

        if (principal == null) {
            return null;
        }

        return principal.getId();
    }

    public boolean isAuthenticated() {
        return getCurrentPrincipal() != null;
    }

    public boolean isPatient() {
        return hasRole("ROLE_PATIENT");
    }

    public boolean isStaff() {
        return hasRole("ROLE_STAFF");
    }

    public boolean isDoctor() {
        return hasRole("ROLE_DOCTOR");
    }

    public boolean isAdmin() {
        return hasRole("ROLE_ADMIN");
    }

    private boolean hasRole(String role) {
        Authentication authentication = getAuthentication();

        return authentication != null && authentication.isAuthenticated() && authentication.getAuthorities()
                .stream()
                .anyMatch(authority -> authority.getAuthority().equals(role));
    }
}