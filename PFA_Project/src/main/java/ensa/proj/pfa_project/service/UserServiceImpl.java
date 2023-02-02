package ensa.proj.pfa_project.service;

import ensa.proj.pfa_project.entities.User;
import ensa.proj.pfa_project.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements  UserService{

    private UserRepository userRepository;
    @Override
    public User findUser(Long id) {
        return userRepository.findById(id).orElseThrow();
    }
}
