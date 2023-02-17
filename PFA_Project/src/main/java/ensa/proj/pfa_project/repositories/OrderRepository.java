package ensa.proj.pfa_project.repositories;

import ensa.proj.pfa_project.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order,Long> {
    Optional<Order> findById(Long id);
    List<Order> findByShopId(Long id);
    List<Order> findByUserId(Long id);
}
