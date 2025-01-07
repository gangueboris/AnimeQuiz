import { Component } from '@angular/core';

@Component({
  selector: 'app-complete-quiz',
  imports: [],
  template: `
    <section>
        <div class="complete-quiz__container container">
            <i class="fa-solid fa-xmark"></i>
            <div class="complete-quiz-content">
                <div><img src="" alt="similer"></div>
                <h3>Your Score</h3>
                <p>{{ sucessAnswers }} / {{ nbQuestions }}</p>
                <button class="try-again-btn">Try Again</button>
            </div>
            <div class="result__container">
               <div class="correct-answers">
                   <i class="fa-regular fa-circle-check"></i>
                   <p>Correct Answers: {{ sucessAnswers }}</p>
               </div>
               <div class="incorrect-answers">
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
