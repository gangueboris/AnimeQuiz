import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup,FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Quiz } from '../../types-quiz';
import { QuizService } from '../../services/quiz.service';


@Component({
  selector: 'app-edit-question',
  imports: [ReactiveFormsModule],
  template: `
  <body [class.no-scroll]="isActiveDelQuestSection">
    <section class="edit-questions-section">
      <div class="quiz__header">
        <a (click)="goHome()">
          <h1 class="logo">AnimeQuiz
          <span><i class="fa-regular fa-pen-to-square"></i></span>
          </h1>
        </a>
      </div>

      <div class="edit-question__container container">
        @for(data of dataQuestions; track data; let i = $index) {
          <form [id]="'form-' + i" class="quiz-container" [formGroup]="quizForms[i]" (ngSubmit)="onUpdateSubmit(i, data.id)">
            <div class="question-section">
              <label for="question" class="question-label">Question {{ i + 1 }}
                @if( isFormVisible(i)) { 
                  <i class="fa-solid fa-caret-down down-icon" (click)="toggleVisibleIcon(i);"></i>
                }@else {
                  <i class="fa-solid fa-caret-up up-icon" (click)="toggleVisibleIcon(i);"></i>
                }
              </label>
              <input type="text" id="question" placeholder="Your Question Here..." class="question-input"  formControlName="question"/>
            </div>
            
              @if(isFormVisible(i)) {
                <div formArrayName="choices" class="choices-section">
                  <p class="choices-label">Choices</p>
                  @for(choice of choices(i).controls; track choice; let j = $index) {
                    <div class="choice-item">
                      <span class="choice-label">{{ choicesLetters[j] }}:</span>
                      <input type="text" [placeholder]="'Add Question ' + (j + 1)" class="choice-input" [value]="choice.value" [formControlName]="j"/>
                      <i class="fa-solid fa-xmark close-btn" (click)="removeChoice(i, j)" [class.visible]="closeChoiceVisible[i]"></i>
                    </div>
                  }
                  <button type="button" class="add-choice-btn" (click)="addNewChoice(i)" [class.active-diseable]="disabledAddChoice[i]">Add a New Choice</button>
                </div>
                
                <!-- Correct answers -->
                <div class="correct-answer-section">
                  <label for="correct-answer" class="answer-label">Correct Answer</label>
                  <input type="text" id="correct-answer" placeholder="Add the correct answer..." class="answer-input" [value]="data.correctAnswer" formControlName="correctAnswer"/>
                </div>
                 
                <!-- Save button -->
                <button type="submit" class="form-submit-btn" [disabled]="quizForms[i].invalid" [class.active-diseable]="quizForms[i].invalid">Save</button>
              }
            
            @if(!isFormVisible(i)) {
              <i class="fa-solid fa-trash-can delete-icon" (click)="toggleDeleteQuestion(i, data.id)"></i>
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
            <button class="delete-btn btn" (click)="deleteQuestion(quizId)">Delete</button>
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
  disabledAddChoice: boolean[] = [];
  closeChoiceVisible: boolean[] = [];
  quizForms: FormGroup[] = [];
  dataQuestions: Array<Quiz> = [];
  quizId: number = 0;

 


  constructor(private fb: FormBuilder, private router: Router, private quizService: QuizService) { 
    this.initCloseChoiceVisible();
  }

  ngOnInit(): void {
    // Load the data From the backEnd
   /* this.quizService.getAllQuiz().subscribe({
      next: (data) => {
        //console.log('Data received:', data); // Log the data here
        this.dataQuestions = data;

      },
      error: (err) => {
        console.error('Error fetching data:', err); // Log any errors
      },
      complete: () => {
         // Initialize the shuffleQuestions when the page is loaded
         this.initializeForms();
      },
    });*/
    this.dataQuestions = this.quizService.getDataQuestions();
    this.initializeForms();
    
  }

  // Initialize form groups for all questions
  initializeForms(): void {
    this.dataQuestions.forEach(data => {
      const questionForm = this.fb.group({
        question: [data.question, Validators.required],
        choices: this.fb.array(
          data.incorrectAnswers.map((answer) => this.fb.control(answer, Validators.required)) // issue
        ),
        correctAnswer: [data.correctAnswer, Validators.required]
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
    this.dataQuestions[questionIndex].incorrectAnswers[choiceIndex] = value;
  }

  // Update correct answer value dynamically
  onCorrectAnswerInput(index: number, value: string): void {
    this.dataQuestions[index].correctAnswer = value;
  }

  // Handle form submission by Updating the quiz
  onUpdateSubmit(index: number, idQuiz:number | undefined): void {
    if (this.quizForms[index].valid) {
      // Toggle the icon to let know that the file is submitted
      this.toggleVisibleIcon(index);
       
      // Get the form content
      const submitted =  this.quizForms[index].value;
      const updateQuiz: Quiz = {
        id: idQuiz,
        question:  submitted["question"],
        correctAnswer: submitted["correctAnswer"],
        incorrectAnswers: submitted["choices"]
      };
     
      // Insert logic to save to the database
      this.quizService.updateQuiz(updateQuiz).subscribe({
        error: (err) => {
          console.log("Updating error", err);
        },
        complete () {
            console.log("Update SUCCESS !!");
        }
      });
    } else {
      console.error('Form is invalid !');
    }
  }

  // Toggle visibility of question
  toggleVisibleIcon(index: number): void {
    const formElement = document.getElementById('form-'+ index);
    if(this.isFormVisible(index)) {
      formElement?.classList.remove('isFormVisible');
    }else {
      formElement?.classList.add('isFormVisible');
    }
  }
  
  // Function to check is the form is visible or not
  isFormVisible(formId: number) : boolean {
    const formElement = document.getElementById('form-'+ formId);
    if(formElement?.classList.contains('isFormVisible')) {
      return true;
    } else {
      return false;
    }
  
  }

  // Toggle Delete question
  toggleDeleteQuestion(index: number, idQuiz: number | undefined): void {
    this.isActiveDelQuestSection = true;
    this.delQuestionNumber.set(index + 1);

    // Set the quizId to retrieve it when the deletion is comfirmed
    if(idQuiz) this.quizId = idQuiz;
   
  }

  

  removeChoice(questionIndex: number, optionIndex: number): void {
    this.choices(questionIndex).removeAt(optionIndex);
    if(this.choices(questionIndex).length == 2) {
      this.closeChoiceVisible[questionIndex] = true;
    }
    // disable = true when I remove choice
    this.disabledAddChoice[questionIndex] = false;
  }
  // Function to initialize closeChoice array
  initCloseChoiceVisible(): void {
    for(let i = 0; i < this.dataQuestions.length; i++) {
      this.closeChoiceVisible.push(false);
      this.disabledAddChoice.push(false);
    }
   
  }
  // Create a new choice FormControl
  createChoice(): FormControl {
    return this.fb.control('', Validators.required);
  }
  

  // Add a new choice
  addNewChoice(questionIndex: number): void {
    // logic to show close btn when add new choies and nbChoices > 2
    if(this.choices(questionIndex).length >= 2) {
      this.closeChoiceVisible[questionIndex] = false;
    }

    // Add new choice when it possible
    if (this.choices(questionIndex).length < this.choicesLetters.length) {
      this.choices(questionIndex).push(this.createChoice());
    } else {
      this.disabledAddChoice[questionIndex] = true;
    }
  }


  /*=================METHODs FOR DELETE POP-UP==================*/
  cancelDelete(): void {
    this.isActiveDelQuestSection = !this.isActiveDelQuestSection;
  }

  // Delete question in the database
  deleteQuestion(quizId: number): void {
    this.quizService.deleteQuiz(quizId).subscribe({
      error: (err) => {
        console.log("Error message", err);
      }, 
      complete: () => {
        console.log("Success deletion");
      }
    });
    this.cancelDelete();
  }
  

  // Close the pop-up if the background is clicked
  onBackgroundClick(event: MouseEvent): void {
    if(event.target == event.currentTarget) {
      this.isActiveDelQuestSection = !this.isActiveDelQuestSection;
    }
  }
  

  // Redirect on the home page
  goHome(): void {
    this.router.navigate(['']);
  }
  
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

 // Problem with delete quiz
 - I don't know to retrieve the quiz'index for deletion


 ===========================================
 // For updating
 - I can put in an hidden input the id
 - Instead of using the Array's id, I can use the ID an iterate into dataQuestion to find the ...
*/