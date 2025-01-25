import { Injectable } from '@angular/core';
import  { Quiz } from '../types-quiz';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private dataQuestions: Array<Quiz> = [
    {
      question: "What is the name of the main protagonist in the anime What is the name of the main protagonist in the anime 'Naruto'?",
      correct_answer: "Naruto Uzumaki",
      incorrect_answers: [
        "Sasuke Uchiha",
        "Kakashi Hatake",
        "Sakura Haruno"
      ]
    },
    {
      question: "In 'Attack on Titan', what is the name of the Titan form used by Eren Yeager?",
      correct_answer: "Attack Titan",
      incorrect_answers: [
        "Colossal Titan",
        "Armored Titan",
        "Beast Titan"
      ]
    },
    {
      question: "Which anime features the character Light Yagami and a notebook that can kill?",
      correct_answer: "Death Note",
      incorrect_answers: [
        "Tokyo Ghoul",
        "Code Geass",
        "Psycho-Pass"
      ]
    },
    {
      question: "What is the name of the school in 'My Hero Academia' where students train to become heroes?",
      correct_answer: "U.A. High School",
      incorrect_answers: [
        "Shiketsu High School",
        "Ketsubutsu Academy",
        "Hosu Academy"
      ]
    },
    {
      question: "In the anime 'Dragon Ball Z', what is the name of Goku's original Saiyan name?",
      correct_answer: "Kakarot",
      incorrect_answers: [
        "Raditz",
        "Bardock",
        "Vegeta"
      ]
    }
  ];
  constructor(private http: HttpClient) { }

 
  // Function to get quiz from the database
  getAllQuiz(): Observable<Array<Quiz>> { 
    return this.http.get<Array<Quiz>>("");
  }

  // Function to add a quiz in the database
  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>("", quiz);
  }

  // Function to update a quiz in the database
  updateQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>("", quiz);
  }

  // Function to delete a quiz in the database
  deleteQuiz(quizId: number): Observable<void> {
    return this.http.delete<void>("");
  }
  getDataQuestions(): Array<Quiz> {
    return [...this.dataQuestions]; // Return a copy to prevent direct mutation
  }
  


}
