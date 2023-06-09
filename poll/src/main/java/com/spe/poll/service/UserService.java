package com.spe.poll.service;

import com.spe.poll.auth.UserRequest;
import com.spe.poll.model.Role;
import com.spe.poll.model.User;
import com.spe.poll.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User findByUsername(String username) {
        try{
            return userRepository.findUserByUsername(username);
        } catch (Exception e) {
            throw new RuntimeException("User not found!");
        }
//        catch{
//            return new UsernameNotFoundException("User not found!");
//        }
    }
    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> findUserById(int id){
        return userRepository.findById(id);
    }

    public Optional<User> findUserByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public Optional<User> findUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public List<User> findUsersByRole(Role role){
        return userRepository.findAllByRole(role);
    }

    public User addUser(User user){
        User newUser=new User();
        newUser.setName(user.getName());
        newUser.setUsername(user.getUsername());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setEmail(user.getEmail());
        newUser.setMobile(user.getMobile());
        newUser.setRole(user.getRole());
        newUser.setFoodChoice(user.getFoodChoice());
        System.out.println("user added !!");
        return userRepository.save(newUser);
    }

    public String deleteUserById(int id){
        userRepository.deleteById(id);
        return "user deleted with id:" + id;
    }

    public User updateUser(User user){
        User existingUser = userRepository.findUserByUsername(user.getUsername());
        existingUser.setName(user.getName());
        existingUser.setMobile(user.getMobile());
        existingUser.setEmail(user.getEmail());
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        existingUser.setFoodChoice(user.getFoodChoice());
        existingUser.setRole(user.getRole());
        System.out.println("user updated !!");
        return userRepository.save(existingUser);
    }

    public List<User> findUsersByRoleAndFoodChoice(UserRequest userRequest) {
        return userRepository.findAllByRoleAndFoodChoice(userRequest.getRole(),userRequest.getFoodchoice());
    }
}