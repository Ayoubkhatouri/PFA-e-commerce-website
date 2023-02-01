package ensa.proj.pfa_project.entities;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private User user;
    private String name;
    @Column(name = "image",length = Integer.MAX_VALUE)
    private String image;
    private String brand;
    private String description;
    @OneToMany(mappedBy = "product")
    private List<Review> reviews=new ArrayList<>();
    private String category;
    private double rating;
    private int numReviews;
    private double price;
    private int countInStock;
}
