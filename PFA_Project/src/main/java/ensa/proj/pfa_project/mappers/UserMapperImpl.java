package ensa.proj.pfa_project.mappers;


import ensa.proj.pfa_project.dtos.UserDTO;
import ensa.proj.pfa_project.entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserMapperImpl {

    private final ShopMapperImpl shopMapper;
    private final OrderMapperImpl orderMapper;
    public UserDTO fromUser(User user){
        UserDTO userDTO=new UserDTO();
        BeanUtils.copyProperties(user,userDTO);
        if(user.getShop()!=null)
        userDTO.setShopDTO(shopMapper.fromShop(user.getShop()));
      userDTO.setOrderDTOS(user.getOrders().stream().map(o->orderMapper.fromOrder(o)).collect(Collectors.toList()));
        return userDTO;
    }

    public User fromUserDTO(UserDTO userDTO){
        User user=new User();
        BeanUtils.copyProperties(userDTO,user);
        user.setShop(shopMapper.fromShopDTO(userDTO.getShopDTO()));
        user.setOrders(userDTO.getOrderDTOS().stream().map(o->orderMapper.fromOrderDTO(o)).collect(Collectors.toList()));
        return user;
    }
}
