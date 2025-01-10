import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-question',
  imports: [],
  template: `
    <section class="edit-questions-section">
      <div class="quiz__header">
        <a href="">
          <h1 class="logo">AnimeQuiz
          <span><i class="fa-regular fa-pen-to-square"></i></span>
          </h1>

        </a>
      </div>
       <div class="edit-question__container container">
          @for(data of dataQuestions; track data) {
            <form class="quiz-container">
              <div class="question-section">
                <label for="question" class="question-label">Question {{dataQuestions.indexOf(data) + 1}}
                  @if(isVisible) { 
                    <i class="fa-solid fa-caret-down" (click)="toggleVisibleIcon()"></i>
                  }@else {
                    <i class="fa-solid fa-caret-up" (click)="toggleVisibleIcon()"></i>
                  }
                </label>
                <input type="text" id="question" placeholder="Your Question Here..." class="question-input"/>
              </div>
              
              @if(isVisible) {
                <div class="choices-section" >
                <p class="choices-label">Choices</p>
                @for(letter of choicesLetters.slice(0, nbQuestion); track letter) {
                  <div class="choice-item">
                        <span class="choice-label">{{ letter }}:</span>
                        <input type="text" [placeholder]="'Add Question ' + (choicesLetters.indexOf(letter) + 1)" class="choice-input" />
                  </div>
                }
              </div>

              <div class="correct-answer-section">
                <label for="correct-answer" class="answer-label">Correct Answer</label>
                <input type="text" id="correct-answer" placeholder="Add the correct answer..." class="answer-input"/>
              </div>
              <button type="submit" class="form-submit-btn">Save</button>

              }
          </form>
        }  
       </div>
    </section>
  `,
  styleUrl: './edit-question.component.css'
})
export class EditQuestionComponent {
  choicesLetters = ['A', 'B', 'C', 'D'];
  nbQuestion = 3;
  isVisible = true;

  addNewQuestion():void {
    this.nbQuestion = this.nbQuestion + 1;
  }
 
  removeChoice(choice: string):void {
  }

  toggleVisibleIcon():void {
    this.isVisible = !this.isVisible;
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
              "Anne Finnelan"
            ]
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
            ]
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
            ]
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
            ]
          }
        ]
  
}

/*
 NB: We will know which question is edited by check which save button is 
 clicked.
 first disable the save until there is a modification in  the input 

 ToDo NEXT
 - Handle up & down button
 - Hadd header to the edit page 
 - Find a solution to only show the clicked question(s)
*/