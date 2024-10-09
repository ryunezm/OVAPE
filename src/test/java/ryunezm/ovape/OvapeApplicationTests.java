package ryunezm.ovape;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import ryunezm.ovape._config.JwtService;
import ryunezm.ovape.auth.AuthenticationRequest;
import ryunezm.ovape.auth.AuthenticationResponse;
import ryunezm.ovape.auth.AuthenticationService;
import ryunezm.ovape.auth.RegisterRequest;
import ryunezm.ovape.content.repositories.QuestionRepository;
import ryunezm.ovape.content.services.ExamService;
import ryunezm.ovape.content.services.ModuleService;
import ryunezm.ovape.user.models.Role;
import ryunezm.ovape.user.models.User;
import ryunezm.ovape.user.repositories.UserRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
class OvapeApplicationTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private ModuleService moduleService;

    @InjectMocks
    private AuthenticationService authenticationService;

    @InjectMocks
    private ExamService examService;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegister_Success() {
        RegisterRequest registerRequest = new RegisterRequest("John", "Doe", "john@unicartagena.edu.co", 2023, 1, "password");
        User user = new User(1, "John", "Doe", "john@unicartagena.edu.co", 2023, 1, "encodedPassword", Role.USER);

        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtService.generateToken(any(User.class))).thenReturn("jwtToken");

        AuthenticationResponse authenticationResponse = authenticationService.register(registerRequest);
        assertNotNull(authenticationResponse);
        assertEquals("jwtToken", authenticationResponse.getToken());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testAuthenticate_Success() {
        AuthenticationRequest authenticationRequest = new AuthenticationRequest("john@unicartagena.edu.co", "password");
        User user = new User(1, "John", "Doe", "john@unicartagena.edu.co", 2023, 1, "encodedPassword", Role.USER);

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(any(User.class))).thenReturn("jwtToken");

        AuthenticationResponse authenticationResponse = authenticationService.authenticate(authenticationRequest);

        assertNotNull(authenticationResponse);
        assertEquals("jwtToken", authenticationResponse.getToken());
        verify(authenticationManager).authenticate(any());
    }
}
