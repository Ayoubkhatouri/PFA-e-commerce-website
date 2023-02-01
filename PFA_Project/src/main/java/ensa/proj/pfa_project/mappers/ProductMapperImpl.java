package ensa.proj.pfa_project.mappers;


import ensa.proj.pfa_project.dtos.ProductDTO;
import ensa.proj.pfa_project.entities.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductMapperImpl {

    private final UserMapperImpl userMapper;
    private final ReviewMapperImpl reviewMapper;

    public ProductDTO fromProduct(Product product){
        ProductDTO productDTO=new ProductDTO();
        BeanUtils.copyProperties(product,productDTO);
        productDTO.setUserDTO(userMapper.fromUser(product.getUser()));
        productDTO.setReviewDTOS(product.getReviews().stream().map(r->reviewMapper.fromReview(r)).collect(Collectors.toList()));
        return productDTO;
    }
    public Product fromProductDTO(ProductDTO productDTO){
        Product product=new Product();
        BeanUtils.copyProperties(productDTO,product);
        product.setUser(userMapper.fromUserDTO(productDTO.getUserDTO()));
        product.setReviews(productDTO.getReviewDTOS().stream().map(r->reviewMapper.fromReviewDTO(r)).collect(Collectors.toList()));
        return product;
    }
}