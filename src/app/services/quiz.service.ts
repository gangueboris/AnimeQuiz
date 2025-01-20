import { Injectable } from '@angular/core';
import  { Quiz } from '../types-quiz';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

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
}
