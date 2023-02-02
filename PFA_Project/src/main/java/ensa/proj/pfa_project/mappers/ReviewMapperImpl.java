package ensa.proj.pfa_project.mappers;

import ensa.proj.pfa_project.dtos.ReviewDTO;
import ensa.proj.pfa_project.entities.Review;
import ensa.proj.pfa_project.entities.User;
import ensa.proj.pfa_project.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewMapperImpl {

    private final UserRepository userRepository;

    public ReviewDTO fromReview(Review review){
        ReviewDTO reviewDTO=new ReviewDTO();
        BeanUtils.copyProperties(review,reviewDTO);
        User user=userRepository.findById(review.getUser().getId()).orElseThrow();
        reviewDTO.setUserId(user.getId());
        reviewDTO.setOwnerFirstName(user.getFirstname());
        reviewDTO.setOwnerLastName(user.getLastname());
        return reviewDTO;
    }

    public Review fromReviewDTO(ReviewDTO reviewDTO){
        Review review=new Review();
        BeanUtils.copyProperties(reviewDTO,review);
        review.setUser(userRepository.findById(reviewDTO.getUserId()).orElseThrow());
        return review;
    }
}
