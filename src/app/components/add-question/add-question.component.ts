import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-question',
  imports: [],
  template: `
  <section class="add-question-section"  [class.active]="addQuestionVisible" (click)="onBackgroundClick($event)">
    <form class="quiz-container">
          <div class="question-section">
            <label for="question" class="question-label">Question <i class="fa-solid fa-xmark" (click)="closeAddQuestion()"></i></label>
            <input type="text" id="question" placeholder="Your Question Here..." class="question-input"/>
          </div>
        
          <div class="choices-section">
            <p class="choices-label">Choices</p>
            @for(letter of choicesLetters.slice(0, nbQuestion); track letter) {
              <div class="choice-item">
                    <span class="choice-label">{{ letter }}:</span>
                    <input type="text" [placeholder]="'Add Question ' + (choicesLetters.indexOf(letter) + 1)" class="choice-input" />
              </div>
            }
            <button class="add-choice-btn" (click)="addNewQuestion()">Add a New Choice</button>
          </div>

          <div class="correct-answer-section">
            <label for="correct-answer" class="answer-label">Correct Answer</label>
            <input type="text" id="correct-answer" placeholder="Add the correct answer..." class="answer-input"/>
          </div>
          <button type="submit" class="form-submit-btn">Save</button>
    </form>
  </section>
  `,
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {
    choicesLetters = ['A', 'B', 'C', 'D'];
    nbQuestion = 3;
    // Passing data from parent to child
    @Input() addQuestionVisible = true;

    addNewQuestion(): void {
      this.nbQuestion = this.nbQuestion + 1;
    }
   
    removeChoice(choice: string): void {
    }

    closeAddQuestion(): void {
      this.addQuestionVisible = false;
    }

    // Close the pop-up if the background is clicked
    onBackgroundClick(event: MouseEvent): void {
      if(event.target == event.currentTarget){
        this.closeAddQuestion();
    }
  }
}
/*
  - Solve addNewQuestion bug: the add question disappear when I click on that button
*/