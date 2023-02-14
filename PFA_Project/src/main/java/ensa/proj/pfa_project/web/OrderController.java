package ensa.proj.pfa_project.web;

import ensa.proj.pfa_project.dtos.OrderDTO;
import ensa.proj.pfa_project.service.OrderService;
import ensa.proj.pfa_project.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/create")
    public OrderDTO createOrder(@RequestBody OrderDTO orderDTO){
        return orderService.saveOrder(orderDTO);
    }
    @GetMapping("/getByShop/{shopId}")
    public List<OrderDTO> getAllOrdersOfShop(@PathVariable Long shopId){
        return orderService.findOrders(shopId);
    }
}
