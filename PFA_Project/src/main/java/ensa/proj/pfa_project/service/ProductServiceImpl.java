package ensa.proj.pfa_project.service;

import ensa.proj.pfa_project.dtos.ProductDTO;
import ensa.proj.pfa_project.entities.Product;
import ensa.proj.pfa_project.entities.Review;
import ensa.proj.pfa_project.entities.User;
import ensa.proj.pfa_project.mappers.ProductMapperImpl;
import ensa.proj.pfa_project.mappers.ReviewMapperImpl;
import ensa.proj.pfa_project.repositories.ProductRepository;
import ensa.proj.pfa_project.repositories.ReviewRepository;
import ensa.proj.pfa_project.repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService{

    private ProductRepository productRepository;
    private  ProductMapperImpl productMapper;


    @Override
    public ProductDTO saveProduct(ProductDTO productDTO) {
      Product product=  productMapper.fromProductDTO(productDTO);
       // System.out.println(product);
        Product savedProduct=productRepository.save(product);

        return productMapper.fromProduct(savedProduct);
    }

    @Override
    public List<ProductDTO> listProducts() {
        List<Product> products= productRepository.findAll();
        return products.stream().map(p->productMapper.fromProduct(p)).collect(Collectors.toList());
    }

    @Override
    public ProductDTO getProduct(Long id) {
        return productMapper.fromProduct( productRepository.findProductById(id).orElseThrow());
    }
}
