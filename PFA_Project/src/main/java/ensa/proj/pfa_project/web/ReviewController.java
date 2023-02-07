package ensa.proj.pfa_project.web;


import ensa.proj.pfa_project.dtos.ProductDTO;
import ensa.proj.pfa_project.dtos.ReviewDTO;
import ensa.proj.pfa_project.service.ReviewService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/create")
    public ReviewDTO createReview(@RequestBody ReviewDTOAndproductId reviewDTOAndproductId){
        return reviewService.saveReview(reviewDTOAndproductId.getReviewDTO(),reviewDTOAndproductId.getProductId());
    }
    @DeleteMapping("/delete/{id}")
    public void deleteReview(@PathVariable Long id){
        reviewService.deleteReview(id);
    }
}

@Data
class ReviewDTOAndproductId{
    private ReviewDTO reviewDTO;
    private Long productId;
}
