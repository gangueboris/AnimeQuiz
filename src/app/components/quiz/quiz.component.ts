import { Component } from '@angular/core';
import { UserResponse } from '../home/types-quiz';


@Component({
  selector: 'app-quiz',
  imports: [],
  template: `
    <section>
      <!-- Quiz Header-->
      <div class="quiz__container container">
        <div class="quiz__header">
          <div>
            <a href=""><h1 class="logo">AnimeQuiz</h1></a>
            <p>{{ nbQuestions }} questions</p>
          </div>
          <div class="quiz-clock"><i class="fa-solid fa-stopwatch"></i> <span>00:02:54</span></div>
        </div>

        <!-- Quiz Questions -->
        <div class="questions__container">
          <div>
              <div class="questions__container-header">
                  <p class="number">{{ nextIndex + 1 }}</p>
                  <p>{{ dataQuestions[nextIndex].question }}</p>
              </div>
              <div class="questions__container-list">
                  @for(question of dataQuestions[nextIndex].incorrect_answers; track $index; let i = $index) {
                    <div  [class]="'question' + ' q'+ i"  (click)="selectedQuestion(i)">{{choicesLetters[i]}}: {{ question }}</div>
                  }
              </div>
              <button type="button" class="next-question" (click)="goToNextQuestion()">Next</button>
          </div>
        </div>
      </div>    
       
      <!-- Complete Quiz -->
      <div class="complete-quiz__container container" [class.visible]="quizResult">
            <!--<i class="fa-solid fa-xmark"></i>-->
            <div class="complete-quiz-content">
                <div class="img__container"><img src="assets/very-happy-emoji.png" alt="similer"></div>
                <h1>Your Score</h1>
                <p>{{ successAnswers }}/{{ nbQuestions }}</p>
                <div class="quiz-clock"><i class="fa-solid fa-stopwatch"></i> <p>00:02:54</p></div>
                <button class="try-again-btn">Try Again</button>
            </div>
            <div class="result__container">
               <div class="answers">
                   <i class="fa-regular fa-circle-check"></i>
                   <p>Correct Answers: {{ successAnswers }}</p>
               </div>
               <div class="answers">
                  <i class="fa-regular fa-circle-xmark"></i>
                  <p>Incorrect Answers: {{ nbQuestions - successAnswers }}</p>
               </div>
            </div>
        </div>
    </section>

    
    
  `,
  styleUrl: './quiz.component.css'
})

/*============================== Interfaces definitions =================================== */


export class QuizComponent {
  choicesLetters = ['A', 'B', 'C', 'D'];
  nextIndex = 0;
  successAnswers = 0;
  nbQuestions = 5;
  quizResult = true;
  userResponses: UserResponse[] = [];
  
  
  // Function to get the next question
  goToNextQuestion():void {
    // Update the nextIndex
    if(this.nextIndex < this.dataQuestions.length - 1) {
      this.nextIndex = this.nextIndex + 1;
    }else{
      // Compute user response result
      this.computeScore();
      
      // Show the result card
      this.quizResult = false;

      // console log all user responses
      //onsole.log(this.userResponses);
    }
    
    // Get the choosen answer, add it to the response array and the reset the active class
    let userChoice = '';
    const questionElements = document.getElementsByClassName('question');
    for(let i = 0; i < questionElements.length; ++i){
      if(questionElements[i].classList.contains('active')) {
        userChoice = questionElements[i].textContent?.trim() ?? ''; // Use textContent and ensure it is not null;
        break;
      }
    }
    this.userResponses.push({'user_response': userChoice.split(':')[1]});
    this.resetSelectedQuestion();
  }
  
  // Function to clear remove the active on a list of questions
  resetSelectedQuestion(): void {
    const questionElements = document.getElementsByClassName('question');
    for(let i = 0; i < questionElements.length; ++i) {
      if(questionElements[i].classList.contains('active')) {
        questionElements[i].classList.remove('active');
      }
    }
  }

  // Function to active the user choice
  selectedQuestion(index: number): void {
    // Get all elements with the class question and remove the active 
    const questionElements = document.getElementsByClassName('question');
    this.resetSelectedQuestion();

    // Get element with the class 'q' + index
    const questionElement = document.getElementsByClassName('q' + index);
    questionElement[0].classList.add('active');
  
  }

  computeScore(): void {
    let userResponse = '';
    for(let i = 0; i < this.userResponses.length; ++i) {
      //userResponse = this.userResponses[i].user_response;
      userResponse = this.userResponses[i].user_response;
      
      let correctAnswer = this.dataQuestions[i].correct_answer;
      if(userResponse == correctAnswer) {
        this.successAnswers += 1;
      }
    }
  }





  dataQuestions = [
    {
      question: "What is the name of the main protagonist in the anime What is the name of the main protagonist in the anime 'Naruto'?",
      correct_answer: "Naruto Uzumaki",
      incorrect_answers: [
        "Sasuke Uchiha",
        "Kakashi Hatake",
        "Sakura Haruno"
      ],
      isVisible: false
    },
    {
      question: "In 'Attack on Titan', what is the name of the Titan form used by Eren Yeager?",
      correct_answer: "Attack Titan",
      incorrect_answers: [
        "Colossal Titan",
        "Armored Titan",
        "Beast Titan"
      ],
      isVisible: false
    },
    {
      question: "Which anime features the character Light Yagami and a notebook that can kill?",
      correct_answer: "Death Note",
      incorrect_answers: [
        "Tokyo Ghoul",
        "Code Geass",
        "Psycho-Pass"
      ],
      isVisible: false
    },
    {
      question: "What is the name of the school in 'My Hero Academia' where students train to become heroes?",
      correct_answer: "U.A. High School",
      incorrect_answers: [
        "Shiketsu High School",
        "Ketsubutsu Academy",
        "Hosu Academy"
      ],
      isVisible: false
    },
    {
      question: "In the anime 'Dragon Ball Z', what is the name of Goku's original Saiyan name?",
      correct_answer: "Kakarot",
      incorrect_answers: [
        "Raditz",
        "Bardock",
        "Vegeta"
      ],
      isVisible: false
    }
  ];
  

}

/*
 - Hover the choice with a color and when it click, assign a color(Done)
 - implement the logic when the user click on a choice(Done)
 - Disable next button until a choice is made (Done)

- Implement the logic to display shuffly correct and incorrects answers.
 - Update nbQuestions when to load dataQuestions
*/