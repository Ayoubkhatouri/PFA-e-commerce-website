package ensa.proj.pfa_project.mappers;


import ensa.proj.pfa_project.dtos.UserDTO;
import ensa.proj.pfa_project.entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserMapperImpl {

    private final ShopMapperImpl shopMapper;
    public UserDTO fromUser(User user){
        UserDTO userDTO=new UserDTO();
        BeanUtils.copyProperties(user,userDTO);
        if(user.getShop()!=null)
        userDTO.setShopDTO(shopMapper.fromShop(user.getShop()));
        return userDTO;
    }

    public User fromUserDTO(UserDTO userDTO){
        User user=new User();
        BeanUtils.copyProperties(userDTO,user);
        user.setShop(shopMapper.fromShopDTO(userDTO.getShopDTO()));
        return user;
    }
}
