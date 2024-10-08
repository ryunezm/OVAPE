package ryunezm.ovape.auth.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValidEmailValidator implements ConstraintValidator<ValidEmail, String> {
    private static final String EMAIL_PATTERN = ".*@unicartagena\\.edu\\.co$";

    public void initialize(ValidEmail constraintAnnotation) {
    }

    public boolean isValid(String email, ConstraintValidatorContext context) {
        return email != null && email.matches(EMAIL_PATTERN);
    }
}
