package ensa.proj.pfa_project.entities;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Commandes") //cause Order is a reserved PostgreSQL name
public class Order {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Shop shop;
    @ManyToOne
    private User user;
    private double totalePrice;
    private int qty;
    @Enumerated(EnumType.STRING)
    private Status status;
    private String ProductName;
    private Long productId;


}
