package ensa.proj.pfa_project.service;

import ensa.proj.pfa_project.dtos.ReviewDTO;
import ensa.proj.pfa_project.entities.Product;
import ensa.proj.pfa_project.entities.Review;

import java.util.List;

public interface ReviewService {
    ReviewDTO saveReview(ReviewDTO reviewDTO,Long productId);
    void deleteReview(Long id);

}
