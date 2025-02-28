import { Component, OnInit } from '@angular/core';
import { Quiz, UserResponse } from '../../types-quiz';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  imports: [],
  template: `
    <section>
      <!-- Quiz Header-->
      <div class="quiz__container container">
        <div class="quiz__header">
          <div>
            <a><h1 class="logo" (click)="goHome()">AnimeQuiz</h1></a>
            <p class="top-nb-questions">{{ nbQuestions }} questions</p>
          </div>
          <div class="quiz-clock"><i class="fa-solid fa-stopwatch"></i> <span>{{ timeElapsed }}</span></div>
        </div>

        <!-- Quiz Questions -->
        <div class="questions__container">
          <div>
              <div class="questions__container-header">
                  <p class="number">{{ nextIndex + 1 }}</p>
                  <p>{{ dataQuestions[nextIndex].question }}</p>
              </div>
              <div class="questions__container-list">
                  @for(question of shuffledQuestions; track $index; let i = $index) {
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
                <div class="img__container"><img [src]="'assets/' + emoji" alt="similer"></div>
                <h1>Your Score</h1>
                <p>{{ successAnswers }}/{{ nbQuestions }}</p>
                <div class="quiz-clock"><i class="fa-solid fa-stopwatch"></i> <p>{{ timeElapsed }}</p></div>
                <button class="try-again-btn" (click)="startQuiz()">Try Again</button>
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


export class QuizComponent implements OnInit{
  choicesLetters = ['A', 'B', 'C', 'D', 'E'];
  nextIndex = 0;
  successAnswers = 0;
  nbQuestions = 5;
  quizResult = true;
  emoji = "very-happy-emoji.png";
  userResponses: UserResponse[] = [];
  shuffledQuestions: string[] = [];
  timeElapsed: string = '00:00:00';
  startTime!: Date;
  timerInterval: any;
  dataQuestions: Array<Quiz> = [];
  
  ngOnInit(): void {    
    /*this.quizService.getAllQuiz().subscribe({
      next: (data) => {
        //console.log('Data received:', data); // Log the data here
        this.dataQuestions = data;

      },
      error: (err) => {
        console.error('Error fetching data:', err); // Log any errors
      },
      complete: () => {
         // Initialize the shuffleQuestions when the page is loaded
         this.nbQuestions = this.dataQuestions.length;
         this.startQuiz();
         this.clockLogic();
      },
    });
    */
    this.dataQuestions = this.quizService.getDataQuestions();
    this.nbQuestions = this.dataQuestions.length;
    this.startQuiz();
    this.clockLogic();

      
  }
  
  // Contructor
  constructor (private router: Router, private quizService: QuizService) {}
  
  // Function to get clicked value (the user choice)
  getUserChoice(): string {
    // Get the choosen answer, add it to the response array and the reset the active class
    let userChoice = '';
    const questionElements = document.getElementsByClassName('question');
    for (let i = 0; i < questionElements.length; ++i){
      if (questionElements[i].classList.contains('active')) {
        userChoice = questionElements[i].textContent?.trim() ?? ''; // Use textContent and ensure it is not null;
        break;
      }
    }
    return userChoice.split(': ')[1];
  }
  // Function to get the next question
  goToNextQuestion():void {
    // Add the user choice in the userResponses list 
     this.userResponses.push({'user_response': this.getUserChoice() ?? ""});

    // Update the nextIndex
    if(this.nextIndex < this.dataQuestions.length - 1) {
      this.nextIndex = this.nextIndex + 1;
      this.shuffledQuestions = this.getShuffledQuestions(this.nextIndex); // Update the shuffle array
    }else{
      // We reache the end so, update the emoji
      this.emojiResultLogic();
      
      // Show the result card by activating it visibility
      this.quizResult = false;

      // Clear Time 
      this.clearTimer();

      // Hide the top clock
      this.clockLogic();
    }
    
    this.resetSelectedQuestion();
  }
  
  // Function to clear remove the active on a list of questions
  resetSelectedQuestion(): void {
    const questionElements = document.getElementsByClassName('question');
    for(let i = 0; i < questionElements.length; ++i) {
      if(questionElements[i].classList.contains('active')) {
        questionElements[i].classList.remove('active');
      }
      if(questionElements[i].classList.contains('success-color')) {
        questionElements[i].classList.remove('success-color');
      }
      if(questionElements[i].classList.contains('error-color')) {
        questionElements[i].classList.remove('error-color');
      }
      if(questionElements[i].classList.contains('diseabled')) {
        questionElements[i].classList.remove('diseabled');
      }
    }
  }
  
  // Function to disabled cursor effects on all questions
  diseabledQuestions(): void {
    const questionElements = document.getElementsByClassName('question');
    for(let i = 0; i < questionElements.length; ++i) {
      questionElements[i].classList.add('diseabled');
    }

  }
  // Function to active the user choice
  selectedQuestion(index: number): void {
      // Get all elements with the class question and remove the active 
      this.resetSelectedQuestion();

      // Get element with the class 'q' + index
      const questionElement = document.getElementsByClassName('q' + index);
      questionElement[0].classList.add('active');
      // Get user choice and the corresponding response
      const userChoice = this.getUserChoice();
      const correctAnswer = this.dataQuestions.find((quiz) => quiz.incorrectAnswers.find((falseAnswer) => falseAnswer === userChoice))?.correctAnswer;
    
      // Handle to show color   
      if(!correctAnswer) { // Means the answers not found in the incorrectAnswers so the userChoice is correct
        questionElement[0].classList.replace('active', 'success-color');

        // Update the correctAnswer tracker
        this.successAnswers++;
      } else {
        questionElement[0].classList.replace('active', 'error-color');
        
        // Find the correct answer to show
        const questionsElements = document.querySelectorAll('.question');
        for(let i = 0; i < questionsElements.length; ++i) {
          const content = questionsElements[i].textContent?.split(': ')[1];
          if(content === correctAnswer) {
            questionsElements[i].classList.add('success-color');    
            break;
          }
        }
      }
      
       // Diseable the click and the hover
       this.diseabledQuestions();
  }

  // Logic to get shuffled questions(correct + incorrects)
  getShuffledQuestions(index: number): Array<string> {
    let shuffledArray = [...this.dataQuestions[index].incorrectAnswers]
    let correctAnswer = this.dataQuestions[index].correctAnswer;
    shuffledArray.push(correctAnswer); // add correctAnwer to incorrectArray to shuffle them
    
    // Logic to randomize the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap
    }
    return shuffledArray;
  }

  // Shuffle and prepare the quiz
  startQuiz(): void {
    this.nextIndex = 0;
    this.userResponses = [];
    this.successAnswers = 0;
    this.quizResult = true;
    this.shuffledQuestions = this.getShuffledQuestions(this.nextIndex);

    this.startTime = new Date();
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timerInterval = setInterval(() => {
      this.updateElapsedTime();
    }, 1000);

    this.clockLogic();

    // Show the quiz-questions before
    const questionsElement = document.querySelector(".questions__container");
    if(questionsElement?.classList.contains("visible")) {
       questionsElement?.classList.remove("visible");
    }

  }

  // Clock functions
  updateElapsedTime(): void {
    const now = new Date();
    const diff = now.getTime() - this.startTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    this.timeElapsed = `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  }
  padNumber(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

  clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  // Function to display the correct emoji based on user's result
  emojiResultLogic(): void {
    // Hide the quiz-questions before
    const questionsElement = document.querySelector(".questions__container");
     this.showHideElement(questionsElement);   

    const score = (this.successAnswers / this.nbQuestions) * 100;
   
    if(score >= 0 && score < 50) {
      this.emoji = "confused-emoji.png";
    }else if(score >= 50 && score < 75) {
      this.emoji = "happy-emoji.png"; 
    }else if(score >= 75 && score <= 100) {
      this.emoji = "very-happy-emoji.png";
    }
  }
 

  // Function to set hide clock
  clockLogic(): void {
    const clock = document.querySelector('.quiz-clock');
    const topNbQuestions = document.querySelector('.top-nb-questions');


    if(clock?.classList.contains('visible')) {
        clock?.classList.remove('visible');
        topNbQuestions?.classList.remove('visible');
    } else {
        clock?.classList.add('visible');
        topNbQuestions?.classList.add('visible');
    }
    
  }
  
 // Redirect on the home page
  goHome(): void {
    this.router.navigate(['']);
  }

  // function to show and Hide an element
  showHideElement(element: any): void {
    if (element?.classList.contains("visible")) {
      element.classList.remove("visible");
    } else {
      element?.classList.add("visible"); 
    }

  }

}

/*
 - Hover the choice with a color and when it click, assign a color(Done)
 - implement the logic when the user click on a choice(Done)
 - Disable next button until a choice is made (Done)

- Implement the logic to display shuffly correct and incorrects answers (Done)
- Update nbQuestions when to load dataQuestions ==> TO DO Letter when implement the backend (Done)

 - Implement smile logic based on the result (Done)
 - Make functionnable the try Again button (Done)
 - Solve the issue of correctAnswers in computeSocre (Done)
 - Add logic to clock (Done)
*/