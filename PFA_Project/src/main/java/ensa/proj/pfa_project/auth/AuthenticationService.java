package ensa.proj.pfa_project.auth;


import ensa.proj.pfa_project.config.JwtService;
import ensa.proj.pfa_project.entities.Role;
import ensa.proj.pfa_project.entities.Shop;
import ensa.proj.pfa_project.entities.User;
import ensa.proj.pfa_project.repositories.ShopRepository;
import ensa.proj.pfa_project.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register(RegisterRequest request) {
        var user= User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .tele(request.getTele())
                .ville(request.getVille())
                .adresse(request.getAdresse())

                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)

                .build();

        repository.save(user);

        var jwtToken=jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .tele(user.getTele())
                .ville(user.getVille())
                .adresse(user.getAdresse())
                .role(user.getRole())
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user=repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken=jwtService.generateToken(user);


        return AuthenticationResponse.builder()
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .tele(user.getTele())
                .ville(user.getVille())
                .adresse(user.getAdresse())
                .role(user.getRole())
                .token(jwtToken)
                .build();
    }
}
