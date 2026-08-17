package com.ocms.online_clinic_management_system.auth.config;

import com.ocms.online_clinic_management_system.auth.jwt.JwtAccessDeniedHandler;
import com.ocms.online_clinic_management_system.auth.jwt.JwtAuthenticationEntryPoint;
import com.ocms.online_clinic_management_system.auth.jwt.JwtAuthenticationFilter;
import com.ocms.online_clinic_management_system.auth.oauth2.CustomOidcUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.ocms.online_clinic_management_system.auth.oauth2.CustomOAuth2UserService;
import com.ocms.online_clinic_management_system.auth.oauth2.OAuth2AuthenticationFailureHandler;
import com.ocms.online_clinic_management_system.auth.oauth2.OAuth2AuthenticationSuccessHandler;
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final JwtAuthenticationEntryPoint authenticationEntryPoint;

    private final JwtAccessDeniedHandler accessDeniedHandler;

    private final CustomOAuth2UserService customOAuth2UserService;

    private final OAuth2AuthenticationSuccessHandler successHandler;

    private final OAuth2AuthenticationFailureHandler failureHandler;

    private final CustomOidcUserService customOidcUserService;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**", "/swagger-ui/**", "/v3/api-docs/**", "/error",  "/oauth2/**", "/login/oauth2/**").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/specialties/all").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/medical-services/specialty/*/examination").hasAnyRole("PATIENT", "DOCTOR", "STAFF")
                        .requestMatchers(HttpMethod.GET, "/api/medical-services/specialty/**").authenticated()
                        .requestMatchers("/api/medical-services/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/doctors").authenticated()
                        .requestMatchers("/api/specialties/**").hasRole("ADMIN")
                        .requestMatchers("/api/patient/**").hasRole("PATIENT")
                        .requestMatchers("/api/staff/patients/**").hasRole("STAFF")
                        .requestMatchers("/api/doctor-schedules/**").hasRole("STAFF")
                        .requestMatchers(HttpMethod.POST, "/api/appointments").hasRole("PATIENT")
                        .requestMatchers(HttpMethod.GET, "/api/appointments/my").hasRole("PATIENT")
                        .requestMatchers(HttpMethod.GET, "/api/appointments/*").hasAnyRole("PATIENT", "STAFF")
                        .requestMatchers(HttpMethod.PATCH, "/api/appointments/*/cancel").hasAnyRole("PATIENT", "STAFF")
                        .requestMatchers(HttpMethod.GET, "/api/appointments").hasRole("STAFF")
                        .requestMatchers(HttpMethod.PATCH, "/api/appointments/*/confirm").hasRole("STAFF")
                        .requestMatchers(HttpMethod.PATCH, "/api/appointments/*/reject").hasRole("STAFF")
                        .requestMatchers(HttpMethod.GET, "/api/medical-examinations/today").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.GET, "/api/medical-examinations/*/treatment-history").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.PATCH, "/api/medical-examinations/*/start").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.GET, "/api/medical-records/appointment/*").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.PUT, "/api/medical-records/appointment/*").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.POST, "/api/laboratory/medical-records/*/test-orders").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.GET, "/api/laboratory/test-orders/*").hasAnyRole("DOCTOR", "STAFF")
                        .requestMatchers(HttpMethod.PATCH, "/api/laboratory/test-orders/*/start").hasRole("STAFF")
                        .requestMatchers(HttpMethod.PATCH, "/api/laboratory/test-order-details/*/result").hasRole("STAFF")
                        .requestMatchers(HttpMethod.GET, "/api/laboratory/test-order-details/*/result").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.GET, "/api/medicines/**").hasAnyRole("PATIENT", "DOCTOR", "STAFF", "ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/medicines").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/medicines/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/medicines/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/medicines/*/restore").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/medicine-categories/**").hasAnyRole("PATIENT", "DOCTOR", "STAFF", "ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/medicine-categories").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/medicine-categories/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/medicine-categories/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/prescriptions/medical-records/*").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.GET, "/api/prescriptions/my/**").hasRole("PATIENT")
                        .requestMatchers(HttpMethod.GET, "/api/prescriptions/*").hasAnyRole( "DOCTOR", "STAFF", "ADMIN")
                        .requestMatchers("/api/inventory/**").hasRole("ADMIN")
                        .anyRequest().authenticated())

                .oauth2Login(oauth -> oauth
                        .userInfoEndpoint(user -> user
                                .oidcUserService(customOidcUserService))
                        .successHandler(successHandler)
                        .failureHandler(failureHandler))
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(authenticationEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler))

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }



    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }
}