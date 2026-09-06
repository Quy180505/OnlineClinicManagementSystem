package com.ocms.online_clinic_management_system.chat.websocket;
import com.ocms.online_clinic_management_system.auth.exception.JwtException;
import com.ocms.online_clinic_management_system.auth.service.CustomUserDetailsService;
import com.ocms.online_clinic_management_system.auth.util.JwtUtil;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
public class WebSocketAuthInterceptor implements ChannelInterceptor {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    public Message<?> preSend(@NonNull Message<?> message, @NonNull MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (accessor == null) {
            return message;
        }

        StompCommand command = accessor.getCommand();

        if (command != StompCommand.CONNECT && command != StompCommand.SEND && command != StompCommand.SUBSCRIBE) {
            return message;
        }

        String authorization = accessor.getFirstNativeHeader("Authorization");

        if (!StringUtils.hasText(authorization) || !authorization.startsWith("Bearer ")) {
            throw new JwtException(ErrorCode.JWT_TOKEN_REQUIRED);
        }

        String token = authorization.substring(7);

        if (!jwtUtil.validateToken(token)) {
            throw new JwtException(ErrorCode.INVALID_TOKEN);
        }

        String username = jwtUtil.extractUsername(token);
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        accessor.setUser(authentication);

        return message;
    }
}