package ryunezm.ovape.content.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ryunezm.ovape.content.models.Lesson;
import ryunezm.ovape.content.models.Module;

import java.util.Optional;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    Optional<Lesson> findByModule(Module module);
}
