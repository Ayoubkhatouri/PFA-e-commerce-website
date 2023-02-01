package ensa.proj.pfa_project.auth;


import ensa.proj.pfa_project.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String firstname;
    private String lastname;
    private String email;
    private String tele;
    private String ville;
    private String adresse;
    private Role role;
    private String token;
}
