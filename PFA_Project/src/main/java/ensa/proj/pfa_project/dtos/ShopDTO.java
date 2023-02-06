package ensa.proj.pfa_project.dtos;

import ensa.proj.pfa_project.entities.Product;
import lombok.Data;

import java.util.List;

@Data
public class ShopDTO {
    private Long id;
    private String name;
    private String description;
    private List<ProductDTO> productsDto;
    private Long userId;
    private String OwnerFirstName;
    private String OwnerLastName;
}
