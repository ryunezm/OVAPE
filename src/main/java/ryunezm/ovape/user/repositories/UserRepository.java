package ryunezm.ovape.user.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ryunezm.ovape.user.models.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository <User, Integer> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
