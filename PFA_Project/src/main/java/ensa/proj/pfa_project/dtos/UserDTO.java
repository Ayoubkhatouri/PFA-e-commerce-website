package ensa.proj.pfa_project.dtos;

import ensa.proj.pfa_project.entities.Role;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private Long id;
    private String firstname;
    private String  lastname;
    private String email;
    private String tele;
    private String ville;
    private String adresse;
    private Role role;
    private ShopDTO shopDTO;
    private List<OrderDTO> orderDTOS;
}
