package ryunezm.ovape.content.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ryunezm.ovape.content.models.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
    // TODO
}