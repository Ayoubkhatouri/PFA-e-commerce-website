package ensa.proj.pfa_project.repositories;

import ensa.proj.pfa_project.entities.Shop;
import ensa.proj.pfa_project.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShopRepository extends JpaRepository<Shop,Long> {
    Optional<Shop> findById(Long ShopId);
    Optional<Shop> findByUser(User user);

}
