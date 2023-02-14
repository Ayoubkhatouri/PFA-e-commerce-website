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
public class Shop {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private String description;
    @OneToOne
    private User user;
    @OneToMany(mappedBy = "shop")
    private List<Product> products=new ArrayList<>();
    @OneToMany(mappedBy = "shop")
    private List<Order> orders=new ArrayList<>();

}
