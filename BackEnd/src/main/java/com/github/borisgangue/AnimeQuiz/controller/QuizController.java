package com.github.borisgangue.AnimeQuiz.controller;

import com.github.borisgangue.AnimeQuiz.model.Quiz;
import com.github.borisgangue.AnimeQuiz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
public class QuizController {
    private final QuizService quizService;

    @Autowired
    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    // Get all quiz
    @GetMapping("/all")
    public ResponseEntity<List<Quiz>> getAllQuiz() {
        return  new ResponseEntity<>(quizService.findAllQuiz(), HttpStatus.OK);
    }

    // Get quiz by id
    @GetMapping("/get/{id}")
    public ResponseEntity<Quiz> getQuiz(@PathVariable("id") Long id) {
        return  new ResponseEntity<>(quizService.findQuizById(id), HttpStatus.OK);
    }

    // Add quiz
    @PostMapping("/add")
    public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz) {
        return  new ResponseEntity<>(quizService.addQuiz(quiz), HttpStatus.CREATED);
    }

    // Update quiz
    @PutMapping("/update")
    public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz) {
        return new ResponseEntity<>(quizService.updateQuiz(quiz), HttpStatus.OK);
    }

    // Delete quiz
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteQuiz(@PathVariable("id") Long id) {
        quizService.deleteQuiz(id);
        return  new ResponseEntity<>(HttpStatus.OK);
    }


}
