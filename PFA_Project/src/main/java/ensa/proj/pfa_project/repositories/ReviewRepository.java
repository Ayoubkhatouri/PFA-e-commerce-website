package ensa.proj.pfa_project.repositories;

import ensa.proj.pfa_project.entities.Review;
import ensa.proj.pfa_project.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review,String> {
    Optional<Review> findReviewById(Long  id);
}
