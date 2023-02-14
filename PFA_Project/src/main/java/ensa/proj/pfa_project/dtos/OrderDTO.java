package ensa.proj.pfa_project.dtos;

import ensa.proj.pfa_project.entities.Status;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class OrderDTO {
    private Long id;
    private Long UserId;
    private String OwnerFirstName;
    private String OwnerLastName;
    private Long shopId;
    private double totalePrice;
    private  int qty;
    @Enumerated(EnumType.STRING)
    private Status status;
    private String ProductName;
    private Long productId;
}
