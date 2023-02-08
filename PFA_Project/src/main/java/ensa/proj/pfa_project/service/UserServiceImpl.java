package ensa.proj.pfa_project.service;

import ensa.proj.pfa_project.entities.User;
import ensa.proj.pfa_project.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements  UserService{

    private UserRepository userRepository;
    private ShopService shopService;
    private ReviewService reviewService;

    @Override
    public User findUser(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    @Override
    public void deleteUser(Long id) {
        User user=userRepository.findById(id).orElseThrow();
        if(user.getShop() !=null)
        shopService.deleteShop(user.getShop().getId());

        user.getReviews().forEach(r->reviewService.deleteReview(r.getId()));
        userRepository.delete(user);
    }
}
