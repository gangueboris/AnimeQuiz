package com.github.borisgangue.AnimeQuiz.repository;

import com.github.borisgangue.AnimeQuiz.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepo extends JpaRepository<Quiz, Long> {
}
