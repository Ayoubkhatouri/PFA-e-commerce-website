package ensa.proj.pfa_project.mappers;

import ensa.proj.pfa_project.dtos.ReviewDTO;
import ensa.proj.pfa_project.entities.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewMapperImpl {

    private final UserMapperImpl userMapper;

    public ReviewDTO fromReview(Review review){
        ReviewDTO reviewDTO=new ReviewDTO();
        BeanUtils.copyProperties(review,reviewDTO);
        reviewDTO.setUserDTO(userMapper.fromUser(review.getUser()));
        return reviewDTO;
    }

    public Review fromReviewDTO(ReviewDTO reviewDTO){
        Review review=new Review();
        BeanUtils.copyProperties(reviewDTO,review);
        review.setUser(userMapper.fromUserDTO(reviewDTO.getUserDTO()));
        return review;
    }
}
