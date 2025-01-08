import { Component } from '@angular/core';

@Component({
  selector: 'app-complete-quiz',
  imports: [],
  template: `
    <section>
        <div class="complete-quiz__container container">
            <i class="fa-solid fa-xmark"></i>
            <div class="complete-quiz-content">
                <div class="img__container"><img src="assets/very-happy-emoji.png" alt="similer"></div>
                <h1>Your Score</h1>
                <p>{{ sucessAnswers }}/{{ nbQuestions }}</p>
                <div class="quiz-clock"><i class="fa-solid fa-stopwatch"></i> <p>00:02:54</p></div>
                <button class="try-again-btn">Try Again</button>
            </div>
            <div class="result__container">
               <div class="answers">
                   <i class="fa-regular fa-circle-check"></i>
                   <p>Correct Answers: {{ sucessAnswers }}</p>
               </div>
               <div class="answers">
                  <i class="fa-regular fa-circle-xmark"></i>
                  <p>Incorrect Answers: {{ nbQuestions - sucessAnswers }}</p>
               </div>
            </div>
        </div>
    </section>
  `,
  styleUrl: './complete-quiz.component.css'
})
export class CompleteQuizComponent {
  sucessAnswers = 4;
  nbQuestions = 5


}
