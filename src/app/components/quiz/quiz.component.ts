import { Component } from '@angular/core';
import { CompleteQuizComponent } from "../complete-quiz/complete-quiz.component";

@Component({
  selector: 'app-quiz',
  imports: [CompleteQuizComponent],
  template: `
    <section>
      <div class="quiz__container container">
        <div class="quiz__header">
          <div>
            <a href=""><h1 class="logo">AnimeQuiz</h1></a>
            <p>{{ nbQuestion }} questions</p>
          </div>
          <div class="quiz-clock"><i class="fa-solid fa-stopwatch"></i> <span>00:02:54</span></div>
        </div>


        <div class="questions__container">
          <div>
              <div class="questions__container-header">
                  <p class="number">1</p>
                  <p>Question ?</p>
              </div>
              <div class="questions__container-list">
                  @for(letter of choicesLetters.slice(0, nbQuestion); track letter) {
                    <div class="question">{{letter}}. Who is Naruto  ?</div>
                  }
              </div>
              <button class="next-question">Next</button>
          </div>
        </div>
      </div>    
    </section>

    <app-complete-quiz/>
  `,
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  choicesLetters = ['A', 'B', 'C', 'D'];
  nbQuestion = 3;

}
