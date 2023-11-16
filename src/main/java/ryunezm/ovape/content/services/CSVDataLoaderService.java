package ryunezm.ovape.content.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ryunezm.ovape.content.models.Question;

import java.util.List;

@Service
public class CSVDataLoaderService {
    private final DataLoaderService dataLoaderService;

    @Autowired
    public CSVDataLoaderService(DataLoaderService dataLoaderService) {
        this.dataLoaderService = dataLoaderService;
    }

    public void loadCsvData(String csvFilePath) {
        List<Question> questions = readQuestionsFromCsv(csvFilePath);
        assert questions != null;
        dataLoaderService.loadQuestionsAndAnswers(questions);
    }

    private List<Question> readQuestionsFromCsv(String csvFilePath) {
        // Implements the logic to read the CSV file and create instances of Question and Answer
        // Uses a library such as OpenCSV or Apache Commons CSV to facilitate reading the CSV file
        // Returns a list of questions
        return null;
    }
}
