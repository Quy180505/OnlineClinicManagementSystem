package com.ocms.online_clinic_management_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class OnlineClinicManagementSystemApplication {

	public static void main(String[] args) {

        SpringApplication.run(OnlineClinicManagementSystemApplication.class, args);
	}

    }
