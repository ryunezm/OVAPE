package ryunezm.ovape.content.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ryunezm.ovape.content.models.Answer;
import ryunezm.ovape.content.models.Question;
import ryunezm.ovape.content.repositories.AnswerRepository;
import ryunezm.ovape.content.repositories.QuestionRepository;

import java.util.List;

@Service
public class DataLoaderService {
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    @Autowired
    public DataLoaderService(QuestionRepository questionRepository, AnswerRepository answerRepository) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    public void loadQuestionsAndAnswers(List<Question> questions) {
        for (Question question : questions) {
            Question savedQuestion = questionRepository.save(question);
            List<Answer> answers = question.getAnswers();
            for (Answer answer : answers) {
                answer.setQuestion(savedQuestion);
                answerRepository.save(answer);
            }
        }
    }
}
