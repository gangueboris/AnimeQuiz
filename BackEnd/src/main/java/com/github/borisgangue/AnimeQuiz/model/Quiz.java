package com.github.borisgangue.AnimeQuiz.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Quiz {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    private String question;
    private String correctAnswer;

    @ElementCollection            // JPA automatically creates a separate table to store the collection. This table will have a FK referencing the parent entity's PK
    private List<String> incorrectAnswers;

    // Constructor required by JPA
    public Quiz() {}

    // Constructor
    public Quiz(String question, String correctAnswer, List<String> incorrectAnswers) {
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.incorrectAnswers = incorrectAnswers;
    }

    // Getters
    public  Long getId() {
        return this.id;
    }

    public String getQuestion() {
        return this.question;
    }

    public String getCorrectAnswer() {
        return this.correctAnswer;
    }

    public List<String> getIncorrectAnswers() {
        return this.incorrectAnswers;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public void setIncorrectAnswers(List<String> incorrectAnswers) {
        this.incorrectAnswers = incorrectAnswers;
    }

    // Override the toString()
    @Override
    public String toString() {
        return "Quiz{" +
                "id=" + id +
                ", question='" + question + '\'' +
                ", correctAnswer='" + correctAnswer + '\'' +
                ", incorrectAnswers=" + incorrectAnswers +
                '}';
    }
}
