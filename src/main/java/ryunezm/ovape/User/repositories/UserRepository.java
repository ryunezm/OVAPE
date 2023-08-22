package ryunezm.ovape.User.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ryunezm.ovape.User.models.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository <User, Integer> {
    Optional<User> findByEmail(String email);
}
