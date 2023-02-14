package ensa.proj.pfa_project.web;

import ensa.proj.pfa_project.dtos.ShopDTO;
import ensa.proj.pfa_project.dtos.UserDTO;
import ensa.proj.pfa_project.entities.User;
import ensa.proj.pfa_project.mappers.UserMapperImpl;
import ensa.proj.pfa_project.service.ShopService;
import ensa.proj.pfa_project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserMapperImpl userMapper;

    @GetMapping("/getAll")
    public List<UserDTO> getAll(){
        return  userService.allUsers();
    }
    @GetMapping("/{userId}")
    public UserDTO findUser(@PathVariable Long userId){
        return userMapper.fromUser( userService.findUser(userId));
    }
    @GetMapping("/supadmin/{userId}")
    public UserDTO findUserAdmin(@PathVariable Long userId){
        return userMapper.fromUser( userService.findUser(userId));
    }
    @DeleteMapping("delete/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }
    @PutMapping("/update/{id}")
    public UserDTO updateUser(@PathVariable Long id,@RequestBody UserDTO userDTO){
        return userService.updateUser(id,userDTO);
    }
}
