package ensa.proj.pfa_project.web;


import ensa.proj.pfa_project.auth.AuthenticationResponse;
import ensa.proj.pfa_project.auth.RegisterRequest;
import ensa.proj.pfa_project.dtos.ProductDTO;
import ensa.proj.pfa_project.entities.Product;
import ensa.proj.pfa_project.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
    @RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

  private final ProductService productService;

    @GetMapping("/getAll")
    public List<ProductDTO> getAllProducts(){
        return productService.listProducts();
    }
    @GetMapping("/{id}")
    public ProductDTO getProduct(@PathVariable Long id ){
        return productService.getProduct(id);
    }
    @PostMapping("/admin/create")
    public ProductDTO createProduct(@RequestBody ProductDTO productDTO){
        return productService.saveProduct(productDTO);
    }
    @DeleteMapping("/admin/delete/{id}")
    public void deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
    }
    @PutMapping("/admin/update/{id}")
    public ProductDTO updateProduct(@PathVariable Long id,@RequestBody ProductDTO productDTO){
        return productService.updateProduct(id,productDTO);
    }

}
