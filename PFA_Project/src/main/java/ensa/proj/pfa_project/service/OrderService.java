package ensa.proj.pfa_project.service;

import ensa.proj.pfa_project.dtos.OrderDTO;
import ensa.proj.pfa_project.entities.Status;
import org.springframework.stereotype.Service;

import java.util.List;


public interface OrderService {
    OrderDTO saveOrder(OrderDTO orderDTO);
    List<OrderDTO> findOrders(Long shopId);
    OrderDTO updateOrder(Long id, Status status);
    List<OrderDTO> findOrdersOfUser(Long userId);
    void deleteOrder(Long orderId);
}
