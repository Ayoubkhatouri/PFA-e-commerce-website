package ensa.proj.pfa_project.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Data //for setter and getter
@Builder // so we can create a new user by just User u =User.Builder().firstName....
@NoArgsConstructor
@AllArgsConstructor
@Entity //to make treat user as an entitie JPA(Java persistence API) for mapping java object to raltional databases
public class User implements UserDetails {
    @Id
    @GeneratedValue
    private Long id;
    private String firstname;
    private String  lastname;
    private String email;
    private String tele;
    private String ville;
    private String adresse;
    private String password;
    @OneToOne(mappedBy = "user")
    private Shop shop;
    @OneToMany(mappedBy = "user")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Review> reviews;
    @Enumerated(EnumType.STRING)
    private  Role role;
    @OneToMany(mappedBy = "user")
    private List<Order> orders=new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword(){
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
