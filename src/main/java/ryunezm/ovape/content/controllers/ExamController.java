package ryunezm.ovape.content.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ryunezm.ovape.content.models.Question;
import ryunezm.ovape.content.models.Module;
import ryunezm.ovape.content.services.ExamService;
import ryunezm.ovape.content.services.ModuleService;

import java.util.List;

@RestController
@RequestMapping("/exams")
public class ExamController {
    private final ExamService examService;
    private final ModuleService moduleService;

    @Autowired
    public ExamController(ExamService examService, ModuleService moduleService) {
        this.examService = examService;
        this.moduleService = moduleService;
    }

    @GetMapping("/generate")
    public ResponseEntity<List<Question>> generateExam(
            @RequestParam Long moduleId,
            @RequestParam int numberOfQuestions) {
        Module module = moduleService.getModuleById(moduleId);
                List<Question> examQuestions = examService.generateExamQuestions(module, numberOfQuestions);

        return new ResponseEntity<>(examQuestions, HttpStatus.OK);
    }
}
