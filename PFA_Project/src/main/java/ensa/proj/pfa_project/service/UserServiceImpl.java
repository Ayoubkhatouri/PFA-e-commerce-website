package ensa.proj.pfa_project.service;

import ensa.proj.pfa_project.dtos.UserDTO;
import ensa.proj.pfa_project.entities.User;
import ensa.proj.pfa_project.mappers.UserMapperImpl;
import ensa.proj.pfa_project.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements  UserService{

    private UserRepository userRepository;
    private ShopService shopService;
    private ReviewService reviewService;
    private UserMapperImpl userMapper;

    @Override
    public User findUser(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    @Override
    public void deleteUser(Long id) {
        User user=userRepository.findById(id).orElseThrow();
        if(user.getShop() !=null)
        shopService.deleteShop(user.getShop().getId());
        user.getReviews().forEach(r->reviewService.deleteReview(r.getId()));
        userRepository.delete(user);
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user=userRepository.findById(id).orElseThrow();
        BeanUtils.copyProperties(userDTO,user);
        userRepository.save(user);
        return userMapper.fromUser(user);
    }

    @Override
    public List<UserDTO> allUsers() {
        List<User> users=userRepository.findAll();
        return users.stream().map(u->userMapper.fromUser(u)).collect(Collectors.toList());
    }

}
