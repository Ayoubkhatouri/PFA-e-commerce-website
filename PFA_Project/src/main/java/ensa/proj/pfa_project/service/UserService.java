package ensa.proj.pfa_project.service;


import ensa.proj.pfa_project.entities.User;


public interface UserService {
    User findUser(Long id);
    void deleteUser(Long id);
}
