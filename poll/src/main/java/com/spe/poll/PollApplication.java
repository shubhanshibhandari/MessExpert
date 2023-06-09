package com.spe.poll;

import com.spe.poll.model.FoodChoice;
import com.spe.poll.model.Image;
import com.spe.poll.model.User;
import com.spe.poll.model.Role;
import com.spe.poll.repository.ImageRepository;
import com.spe.poll.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class PollApplication {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ImageRepository imageRepository;

	public static void main(String[] args) {
		SpringApplication.run(PollApplication.class, args);
	}
	private String password= new BCryptPasswordEncoder().encode("admin");

	@PostConstruct
	public void initAdmin(){
		if(!userRepository.existsById(1)) {
			User user = new User("admin",
					password,
					"admin@gmail.com","9835674980","Satya", FoodChoice.NA,Role.ADMIN);
			userRepository.save(user);
		}
		if(!imageRepository.existsById(1L)){
			Image image = new Image(1L, "IIITB_MENU", null);
			imageRepository.save(image);
		}
		if(!imageRepository.existsById(2L)){
			Image image = new Image(2L, "IIITB_SPL_MENU",null);
			imageRepository.save(image);
		}
	}
}
