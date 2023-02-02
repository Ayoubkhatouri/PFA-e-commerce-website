package ensa.proj.pfa_project.web;

import ensa.proj.pfa_project.dtos.ShopDTO;
import ensa.proj.pfa_project.dtos.UserDTO;
import ensa.proj.pfa_project.entities.User;
import ensa.proj.pfa_project.mappers.UserMapperImpl;
import ensa.proj.pfa_project.service.ShopService;
import ensa.proj.pfa_project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserMapperImpl userMapper;
    @GetMapping("/{userId}")
    public UserDTO findUser(@PathVariable Long userId){
        return userMapper.fromUser( userService.findUser(userId));
    }
}
