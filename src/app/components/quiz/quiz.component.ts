import { Component, OnInit } from '@angular/core';
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
  
  ngOnInit(): void {
    // Initialize the shuffleQuestions when the page is loaded
    this.startQuiz();
    this.nbQuestions = this.dataQuestions.length;
    this.clockLogic();
  }
  
  // Function to get the next question
  goToNextQuestion():void {

     // Get the choosen answer, add it to the response array and the reset the active class
     let userChoice = '';
     const questionElements = document.getElementsByClassName('question');
     for(let i = 0; i < questionElements.length; ++i){
       if(questionElements[i].classList.contains('active')) {
         userChoice = questionElements[i].textContent?.trim() ?? ''; // Use textContent and ensure it is not null;
         break;
       }
     }
     this.userResponses.push({'user_response': userChoice.split(': ')[1] ?? ""});

    // Update the nextIndex
    if(this.nextIndex < this.dataQuestions.length - 1) {
      this.nextIndex = this.nextIndex + 1;
      this.shuffledQuestions = this.getShuffledQuestions(this.nextIndex); // Update the shuffle array
    }else{
      // Compute user response result
      this.computeScore();
      
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
    }
  }

  // Function to active the user choice
  selectedQuestion(index: number): void {
    // Get all elements with the class question and remove the active 
    this.resetSelectedQuestion();

    // Get element with the class 'q' + index
    const questionElement = document.getElementsByClassName('q' + index);
    questionElement[0].classList.add('active');
  
  }
  
  // Function to calculate the score of the user
  computeScore(): void {
    for(let i = 0; i < this.userResponses.length; i++) {
      const userResponse = this.userResponses[i].user_response;
      const correctAnswer = this.dataQuestions[i].correct_answer;
    
      if(userResponse?.trim() === correctAnswer?.trim()) {
        this.successAnswers++;
      }
    }

    // update the emoji
    this.emojiResultLogic();
  }

  // Logic to get shuffled questions(correct + incorrects)
  getShuffledQuestions(index: number): Array<string> {
    let shuffledArray = [...this.dataQuestions[index].incorrect_answers]
    let correctAnswer = this.dataQuestions[index].correct_answer;
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
    const score = (this.successAnswers / this.nbQuestions) * 100;
   
    if(score >= 0 && score < 50){
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
     }else {
      clock?.classList.add('visible');
      topNbQuestions?.classList.add('visible');
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

- Implement the logic to display shuffly correct and incorrects answers (Done)
- Update nbQuestions when to load dataQuestions ==> TO DO Letter when implement the backend (Done)

 - Implement smile logic based on the result (Done)
 - Make functionnable the try Again button (Done)
 - Solve the issue of correctAnswers in computeSocre (Done)
 - Add logic to clock (Done)
*/