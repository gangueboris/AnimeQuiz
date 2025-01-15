import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  imports: [ReactiveFormsModule],
  template: `
  <section class="add-question-section" [class.active]="addQuestionVisible" (click)="onBackgroundClick($event)">
    <form class="quiz-container" [formGroup]="quizForm" (ngSubmit)="onAddSubmit()">
      <!-- Question Section -->
      <div class="question-section">
        <label for="question" class="question-label"> Question <i class="fa-solid fa-xmark" (click)="closeAddQuestion()"></i></label>
        <input type="text" id="question" placeholder="Your Question Here..." class="question-input" formControlName="question"/>
        @if(quizForm.get('question')?.invalid && quizForm.get('question')?.touched) {
          <small style="color: var(--error-color);">Question is required</small>
        }
      </div>
      
      <!-- Choices Section -->
      <div formArrayName="choices" class="choices-section">
        <p class="choices-label">Choices</p>
        @for(choice of choices.controls; track $index; let i = $index) {
          <div class="choice-item">
            <span class="choice-label">{{ choicesLetters[i] }}:</span>
            <input type="text" placeholder="Add Choice {{ i + 1 }}" class="choice-input" [formControlName]="i"/>
          </div>
        }
        <button type="button" class="add-choice-btn" (click)="addNewChoice()" [disabled]="disabledAddChoice" [class.active-diseable]="disabledAddChoice">Add a New Choice</button>
      </div>

      <!-- Correct Answer Section -->
      <div class="correct-answer-section">
        <label for="correct-answer" class="answer-label">Correct Answer</label>
        <input type="text" id="correct-answer" placeholder="Add the correct answer..." class="answer-input" formControlName="correctAnswer"/>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="form-submit-btn" [disabled]="quizForm.invalid" [class.active-diseable]="quizForm.invalid">Save</button>
    </form>
  </section>
  `,
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  choicesLetters = ['A', 'B', 'C', 'D']; 
  @Input() addQuestionVisible = true;
  disabledAddChoice = false;

  quizForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      question: ['', Validators.required],
      choices: this.fb.array([this.createChoice(), this.createChoice()]), // Initialize with 3 choices
      correctAnswer: ['', Validators.required]
    });
  }

  // Getter for FormArray
  get choices(): FormArray {
    return this.quizForm.get('choices') as FormArray;
  }

  // Create a new choice FormControl
  createChoice(): FormControl {
    return this.fb.control('', Validators.required);
  }
  

  // Add a new choice
  addNewChoice(): void {
    if (this.choices.length < this.choicesLetters.length) {
      this.choices.push(this.createChoice());
    } else {
     this.disabledAddChoice = true;
    }
  }

  // Close the form pop-up
  readonly defaultChoicesCount = 2;

  closeAddQuestion(): void {
    this.addQuestionVisible = false;
  
    this.choices.clear();
    for (let i = 0; i < this.defaultChoicesCount; i++) {
      this.choices.push(this.createChoice());
    }
  
    this.quizForm.patchValue({
      question: '',
      correctAnswer: ''
    });
  }
  
  // Handle form submission
  onAddSubmit(): void {
    if (this.quizForm.valid) {
      console.log('Form Submitted:', this.quizForm.value); // insert in the dataBase
      this.closeAddQuestion();
    } else {
      console.error('Form is invalid!');
    }
  }
  

  // Close the pop-up when clicking outside the form
  onBackgroundClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeAddQuestion();
    }
  }

}

/*
- Add notification, confirm the form submission
- It seems like the quizForm.reset does work 
*/
