package ensa.proj.pfa_project.dtos;

import lombok.Data;

@Data
public class UserDTO {
    private String firstname;
    private String  lastname;
    private String email;
    private String tele;
    private String ville;
    private String adresse;
    private ShopDTO shopDTO;
}
