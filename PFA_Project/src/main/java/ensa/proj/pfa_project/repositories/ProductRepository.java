package ensa.proj.pfa_project.repositories;

import ensa.proj.pfa_project.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,String> {
    Optional<Product> findProductById(Long id);
}
