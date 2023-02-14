package ensa.proj.pfa_project.service;

import ensa.proj.pfa_project.dtos.OrderDTO;
import org.springframework.stereotype.Service;

import java.util.List;


public interface OrderService {
    OrderDTO saveOrder(OrderDTO orderDTO);
    List<OrderDTO> findOrders(Long shopId);
}
