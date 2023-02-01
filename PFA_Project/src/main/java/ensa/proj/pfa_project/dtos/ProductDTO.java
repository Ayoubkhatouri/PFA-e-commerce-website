package ensa.proj.pfa_project.dtos;

import lombok.Data;

import java.util.List;

@Data
public class ProductDTO {
    private Long id;
    private UserDTO userDTO;
    private String name;
    private String image;
    private String brand;
    private String description;
    private String category;
    List<ReviewDTO> reviewDTOS;
    private double rating;
    private int numReviews;
    private double price;
    private double countInStock;
}
