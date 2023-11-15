package ryunezm.ovape.content.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ryunezm.ovape.content.models.Module;

public interface ModuleRepository extends JpaRepository<Module, Long> {
}
