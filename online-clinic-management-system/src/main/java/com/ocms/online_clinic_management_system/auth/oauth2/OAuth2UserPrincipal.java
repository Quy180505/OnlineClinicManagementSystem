package com.ocms.online_clinic_management_system.auth.oauth2;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import java.util.Collection;
import java.util.Map;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
@Getter
public class OAuth2UserPrincipal implements OidcUser {

    private final OidcUser oidcUser;

    public OAuth2UserPrincipal(OidcUser oidcUser) {
        this.oidcUser = oidcUser;
    }

    public String getEmail() {
        return oidcUser.getEmail();
    }

    public String getFullName() {
        return oidcUser.getFullName();
    }

    public String getProviderId() {
        return oidcUser.getSubject();
    }

    @Override
    public Map<String, Object> getClaims() {
        return oidcUser.getClaims();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return oidcUser.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return oidcUser.getAuthorities();
    }

    @Override
    public String getName() {
        return oidcUser.getName();
    }

    @Override
    public OidcIdToken getIdToken() {
        return oidcUser.getIdToken();
    }

    @Override
    public OidcUserInfo getUserInfo() {
        return oidcUser.getUserInfo();
    }
}