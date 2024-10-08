package ryunezm.ovape.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ryunezm.ovape._config.JwtService;
import ryunezm.ovape._exceptions.EmailAlreadyExistsException;
import ryunezm.ovape.user.models.Role;
import ryunezm.ovape.user.models.User;
import ryunezm.ovape.user.repositories.UserRepository;

// Service for authentication operations
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository; // User repository
    private final PasswordEncoder passwordEncoder; // Password encoder
    private final JwtService jwtService; // JWT service
    private final AuthenticationManager authenticationManager; // Authentication manager

    // Registers a new user
    public AuthenticationResponse register(RegisterRequest request) {

        if (repository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("This email is already register");
        }

        var user = User
                .builder()
                .first_name(request.getFirst_name())
                .last_name(request.getLast_name())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .semester(request.getSemester())
                .selectedYear(request.getSelectedYear())
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }

    // Authenticates a user
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
                );

        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }
}
