package com.ocms.online_clinic_management_system.common.event;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DomainEventPublisher {

    private final ApplicationEventPublisher publisher;
    public void publish(DomainEvent event) {
        publisher.publishEvent(event);
    }

}