package ensa.proj.pfa_project.service;

import ensa.proj.pfa_project.dtos.ProductDTO;
import ensa.proj.pfa_project.entities.Product;

import java.util.List;

public interface ProductService {
    ProductDTO saveProduct(ProductDTO productDTO);
    List<ProductDTO> listProducts();

    ProductDTO getProduct(Long id);
    void deleteProduct(Long id);

}
