package ensa.proj.pfa_project;

import ensa.proj.pfa_project.repositories.ReviewRepository;
import ensa.proj.pfa_project.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication

public class PfaProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(PfaProjectApplication.class, args);
	}




}
