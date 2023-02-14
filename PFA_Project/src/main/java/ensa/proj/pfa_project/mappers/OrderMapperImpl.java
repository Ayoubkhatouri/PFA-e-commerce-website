package ensa.proj.pfa_project.mappers;

import ensa.proj.pfa_project.dtos.OrderDTO;
import ensa.proj.pfa_project.entities.Order;
import ensa.proj.pfa_project.repositories.OrderRepository;
import ensa.proj.pfa_project.repositories.ProductRepository;
import ensa.proj.pfa_project.repositories.ShopRepository;
import ensa.proj.pfa_project.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderMapperImpl {
    public final OrderRepository orderRepository;
    public final UserRepository userRepository;
    public final ShopRepository shopRepository;

    public OrderDTO fromOrder(Order order){
        OrderDTO orderDTO=new OrderDTO();
        BeanUtils.copyProperties(order,orderDTO);
        orderDTO.setUserId(order.getUser().getId());
        orderDTO.setOwnerFirstName(order.getUser().getFirstname());
        orderDTO.setOwnerLastName(order.getUser().getLastname());
        orderDTO.setShopId(order.getShop().getId());
        return orderDTO;
    }

    public Order fromOrderDTO(OrderDTO orderDTO){
        Order order=new Order();
        BeanUtils.copyProperties(orderDTO,order);
        order.setUser(userRepository.findById(orderDTO.getUserId()).orElseThrow());
        order.setShop(shopRepository.findById(orderDTO.getShopId()).orElseThrow());
        return order;
    }

}
