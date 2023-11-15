package ryunezm.ovape.content.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ryunezm.ovape.content.models.Module;
import ryunezm.ovape.content.models.Question;

import java.util.List;

public interface QuestionRepository extends JpaRepository <Question, Long> {
    List<Question> findByModule(Module module);
}
