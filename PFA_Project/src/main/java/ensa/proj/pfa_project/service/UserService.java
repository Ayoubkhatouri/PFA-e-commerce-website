package ensa.proj.pfa_project.service;


import ensa.proj.pfa_project.dtos.UserDTO;
import ensa.proj.pfa_project.entities.User;

import java.awt.*;
import java.util.List;


public interface UserService {
    User findUser(Long id);
    void deleteUser(Long id);
    UserDTO updateUser(Long id ,UserDTO userDTO);
   List<UserDTO> allUsers();
}
