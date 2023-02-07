package ensa.proj.pfa_project.service;

import ensa.proj.pfa_project.dtos.ReviewDTO;
import ensa.proj.pfa_project.entities.Product;
import ensa.proj.pfa_project.entities.Review;
import ensa.proj.pfa_project.mappers.ReviewMapperImpl;
import ensa.proj.pfa_project.repositories.ProductRepository;
import ensa.proj.pfa_project.repositories.ReviewRepository;
import ensa.proj.pfa_project.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService{

    private ReviewRepository reviewRepository;
    private ReviewMapperImpl reviewMapper;
    private ProductRepository productRepository;
    private UserRepository userRepository;

    @Override
    public ReviewDTO saveReview(ReviewDTO reviewDTO,Long productId) {
        Review review=reviewMapper.fromReviewDTO(reviewDTO);
        Product product=productRepository.findProductById(productId).orElseThrow();
        review.setUser(userRepository.findById(reviewDTO.getUserId()).orElseThrow());
        review.setProduct(product);
        review.setCreatedAt(new Date());
        product.getReviews().add(review);
        product.setNumReviews(product.getNumReviews()+1);
        double somme=0;
       for (int i=0;i<product.getReviews().size();i++){
           somme+=product.getReviews().get(i).getRating();
       }
       product.setRating(somme/product.getNumReviews());
       productRepository.save(product);
       Review review1= reviewRepository.save(review);
       return reviewMapper.fromReview(review1);
    }

    @Override
    public void deleteReview(Long id) {
        Review review=reviewRepository.findReviewById(id).orElseThrow();
        Product product=productRepository.findProductById(review.getProduct().getId()).orElseThrow();
        product.getReviews().remove(review);
        product.setNumReviews(product.getNumReviews()-1);
        double somme=0;
        for (int i=0;i<product.getReviews().size();i++){
            somme+=product.getReviews().get(i).getRating();
        }
        product.setRating(somme/product.getNumReviews());
        productRepository.save(product);
        reviewRepository.delete(review);
    }
}
