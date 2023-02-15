package ensa.proj.pfa_project.service;

import ensa.proj.pfa_project.dtos.OrderDTO;
import ensa.proj.pfa_project.entities.Order;
import ensa.proj.pfa_project.entities.Product;
import ensa.proj.pfa_project.entities.Status;
import ensa.proj.pfa_project.mappers.OrderMapperImpl;
import ensa.proj.pfa_project.repositories.OrderRepository;
import ensa.proj.pfa_project.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService{

    private OrderRepository orderRepository;
    private OrderMapperImpl orderMapper;
    private ProductRepository productRepository;

    @Override
    public OrderDTO saveOrder(OrderDTO orderDTO) {
        Order order=orderMapper.fromOrderDTO(orderDTO);
        order.setStatus(Status.Waiting);
        Product product=productRepository.findById(orderDTO.getProductId()).orElseThrow();
        product.setCountInStock(product.getCountInStock()-orderDTO.getQty());
        Order savedOrder=orderRepository.save(order);
        return orderMapper.fromOrder(savedOrder);
    }

    @Override
    public List<OrderDTO> findOrders(Long shopId) {
        List<Order> orders =orderRepository.findByShopId(shopId);
       List<OrderDTO> orderDTOS=orders.stream().map(o->orderMapper.fromOrder(o)).collect(Collectors.toList());
        return orderDTOS;
    }

    @Override
    public OrderDTO updateOrder(Long id, Status status) {
        System.out.println("----------- "+status);
        Order order=orderRepository.findById(id).orElseThrow();

        if(status==Status.Refused){
            Product product=productRepository.findById(order.getProductId()).orElseThrow();
            product.setCountInStock(product.getCountInStock()+order.getQty());
            productRepository.save(product);
        }
        order.setStatus(status);
        orderRepository.save(order);
        return orderMapper.fromOrder(order);
    }
}
