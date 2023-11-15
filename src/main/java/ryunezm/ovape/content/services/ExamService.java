package ryunezm.ovape.content.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ryunezm.ovape.content.models.Question;
import ryunezm.ovape.content.models.Module;
import ryunezm.ovape.content.repositories.QuestionRepository;

import java.util.Collections;
import java.util.List;

@Service
public class ExamService {
    private final QuestionRepository questionRepository;

    @Autowired
    public ExamService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<Question> generateExamQuestions(Module module, int numberOfQuestions) {
        List<Question> allQuestions = questionRepository.findByModule(module);

        // Shuffle the questions to get a random order
        Collections.shuffle(allQuestions);

        // Select the desired number of questions
        return allQuestions.subList(0, Math.min(numberOfQuestions, allQuestions.size()));
    }
}