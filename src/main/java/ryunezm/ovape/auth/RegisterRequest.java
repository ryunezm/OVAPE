package ryunezm.ovape.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ryunezm.ovape.auth.validators.ValidEmail;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotBlank
    private String first_name;
    @NotBlank
    private String last_name;
    @Email
    @ValidEmail
    private String email;
    private int selectedYear;
    private int semester;
    @NotBlank
    @Size(min = 6)
    private String password;
}
