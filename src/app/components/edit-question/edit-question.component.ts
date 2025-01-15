import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-question',
  imports: [ReactiveFormsModule],
  template: `
  <body [class.no-scroll]="isActiveDelQuestSection">
    <section class="edit-questions-section">
      <div class="quiz__header">
        <a href="">
          <h1 class="logo">AnimeQuiz
          <span><i class="fa-regular fa-pen-to-square"></i></span>
          </h1>
        </a>
      </div>

      <div class="edit-question__container container">
        @for(data of dataQuestions; track data; let i = $index) {
          <form class="quiz-container" [formGroup]="quizForms[i]" (ngSubmit)="onUpdateSubmit(i)">
            <div class="question-section">
              <label for="question" class="question-label">Question {{ i + 1 }}
                @if(dataQuestions[i].isVisible) { 
                  <i class="fa-solid fa-caret-down down-icon" (click)="toggleVisibleIcon(i)"></i>
                }@else {
                  <i class="fa-solid fa-caret-up up-icon" (click)="toggleVisibleIcon(i)"></i>
                }
              </label>
              <input type="text" id="question" placeholder="Your Question Here..." class="question-input"  formControlName="question"/>
            </div>
            
              @if(data.isVisible) {
                <div class="choices-section">
                  <p class="choices-label">Choices</p>
                  @for(choice of choices(i).controls; track choice; let j = $index) {
                    <div class="choice-item">
                      <span class="choice-label">{{ choicesLetters[j] }}:</span>
                      <input type="text" [placeholder]="'Add Question ' + (j + 1)" class="choice-input" [value]="choice.value" [formControlName]="j"/>
                    </div>
                  }
                </div>
                
                <!-- Correct answers -->
                <div class="correct-answer-section">
                  <label for="correct-answer" class="answer-label">Correct Answer</label>
                  <input type="text" id="correct-answer" placeholder="Add the correct answer..." class="answer-input" [value]="data.correct_answer" formControlName="correctAnswer"/>
                </div>

                <!-- Save button -->
                <button type="submit" class="form-submit-btn">Save</button>
              }
            
            @if(!data.isVisible) {
              <i class="fa-solid fa-trash-can delete-icon" (click)="toggleDeleteQuestion(i)"></i>
            }
          </form>
        }
      </div>     

    </section>

    <!--======================================== DELETE QUESTION NOTIFICATION ===============================================-->
    <section class="delete-question-section" [class.active]="isActiveDelQuestSection" (click)="onBackgroundClick($event)">
       <div class="delete-question__container">
          <h2 class="delete-question-header">Do you want this question ?</h2>
          <div class="delete-question-message">
            <p>This will delete question {{delQuestionNumber()}}</p>
          </div>
          <div class="delete-questions-btn-container">
            <button class="cancel-btn btn" (click)="cancelDelete()">Cancel</button>
            <button class="delete-btn btn">Delete</button>
          </div>
       </div>
    </section>
  </body>
  `,
  styleUrl: './edit-question.component.css'
})
export class EditQuestionComponent implements OnInit{
  choicesLetters = ['A', 'B', 'C', 'D'];
  delQuestionNumber = signal(1);
  isActiveDelQuestSection = false;
  quizForms: FormGroup[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  // Initialize form groups for all questions
  initializeForms(): void {
    this.dataQuestions.forEach(data => {
      const questionForm = this.fb.group({
        question: [data.question, Validators.required],
        choices: this.fb.array(
          data.incorrect_answers.map((answer) => this.fb.control(answer, Validators.required)) // issue
        ),
        correctAnswer: [data.correct_answer, Validators.required]
      });
      this.quizForms.push(questionForm);
    });
  }

  // Getter for FormArray for choices
  choices(index: number): FormArray {
    return this.quizForms[index].get('choices') as FormArray;
  }

  // Update question value dynamically
  onQuestionInput(index: number, value: string): void {
    this.dataQuestions[index].question = value;
  }

  // Update specific choice value dynamically
  onChoiceInput(questionIndex: number, choiceIndex: number, value: string): void {
    this.dataQuestions[questionIndex].incorrect_answers[choiceIndex] = value;
  }

  // Update correct answer value dynamically
  onCorrectAnswerInput(index: number, value: string): void {
    this.dataQuestions[index].correct_answer = value;
  }

  // Handle form submission
  onUpdateSubmit(index: number): void {
    if (this.quizForms[index].valid) {
      console.log('Form Submitted:', this.quizForms[index].value, index);
      // Insert logic to save to the database
    } else {
      console.error('Form is invalid!');
    }
  }

  // Toggle visibility of question
  toggleVisibleIcon(index: number): void {
    this.dataQuestions[index].isVisible = !this.dataQuestions[index].isVisible;
  }

  // Delete question
  toggleDeleteQuestion(index: number): void {
    this.dataQuestions.splice(index, 1);
    this.quizForms.splice(index, 1);
  }
 
  

  /*================= CLOSING ICONS ==================*/
 // toggleVisibleIcon(index: number):void {
    //this.dataQuestions[index].isVisible = !this.dataQuestions[index].isVisible;
  //}

  /*================= QUESTIONS DELETION LOGIC ==================*/
 /* toggleDeleteQuestion(index: number): void {
    // Update delete question variable
    //this.delQuestionNumber.update((val) => index + 1);
    this.isActiveDelQuestSection = !this.isActiveDelQuestSection;
  }
  removeChoice(choice: string):void {
  }


  /*=================METHODs FOR DELETE POP-UP==================*/
  cancelDelete(): void {
    this.isActiveDelQuestSection = !this.isActiveDelQuestSection;
  }

  // Close the pop-up if the background is clicked
  onBackgroundClick(event: MouseEvent): void {
    if(event.target == event.currentTarget) {
      this.isActiveDelQuestSection = !this.isActiveDelQuestSection;
    }
  }
  
  
    




    dataQuestions = [
          {
            "type": "multiple",
            "difficulty": "medium",
            "category": "Entertainment: Japanese Anime &amp; Manga",
            "question": "In &quot;Little Witch Academia&quot;, what is Shiny Chariot&#039;s alias at Luna Nova Academy?",
            "correct_answer": "Ursula Callistis",
            "incorrect_answers": [
              "Croix Meridies",
              "Miranda Holbrook",
              "Anne Finnelan", 
              "Boris gangue",
            ],
            "isVisible": false
          },
          {
            "type": "multiple",
            "difficulty": "medium",
            "category": "Entertainment: Japanese Anime &amp; Manga",
            "question": "In &quot;Black Lagoon&quot;, what colour is Rock&#039;s tie?",
            "correct_answer": "Teal",
            "incorrect_answers": [
              "Crimson",
              "Dark Brown",
              "Black"
            ],
            "isVisible": false
          },
          {
            "type": "multiple",
            "difficulty": "medium",
            "category": "Entertainment: Japanese Anime &amp; Manga",
            "question": "In the ADV (English) Dub of the anime &quot;Ghost Stories&quot;, which character is portrayed as a Pentacostal Christian?",
            "correct_answer": "Momoko Koigakubo",
            "incorrect_answers": [
              "Hajime Aoyama",
              "Satsuki Miyanoshita",
              "Mio Itai"
            ],
            "isVisible": false
          },
          {
            "type": "multiple",
            "difficulty": "medium",
            "category": "Entertainment: Japanese Anime &amp; Manga",
            "question": "Which of the stands from &quot;JoJo&#039;s Bizarre Adventure&quot; mimics the likeness of a tomato?",
            "correct_answer": "Pearl Jam",
            "incorrect_answers": [
              "Red Hot Chili Pepper",
              "Cream Starter",
              "Nut King Call"
            ],
            "isVisible": false
          }
        ]
  
}

/*
 NB: We will know which question is edited by check which save button is 
 clicked.
 first disable the save until there is a modification in  the input 

 ToDo NEXT
 - Handle up & down button (Done)
 - Hadd header to the edit page (Done)
 - Find a solution to only show the clicked question(s) (Done)
 - Implement style and logic of delete pop-up (Done)
 - Bring add-question into home component as a pop-up (Done)

 - Form Validation, for saving
 - Delete logic

*/