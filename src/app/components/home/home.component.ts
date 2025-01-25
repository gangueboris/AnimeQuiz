import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AddQuestionComponent } from "../add-question/add-question.component";
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../types-quiz';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, AddQuestionComponent],
  template: `
  <!-- NAVBAR -->
    <nav class="scrolled">
        <div class="nav__container container">
            <a (click)="goHome()"><h1 class="logo">AnimeQuiz</h1></a>
            <div class="profile__container">
               <p>AnimeQuizer <span> {{ userXP }} XP</span></p>
            </div>
        </div>
    </nav>

<!-- ADD-QUESTION COMPONENT -->
  <app-add-question [addQuestionVisible]="isAddQuestionVisible"/>

<!-- HOME -->
    <section class="home__section">
      <div class="home__container container">
        <div class="card__container">
          <div class="card__header">
            <div class="card__header-img">
               <img ngSrc="assets/readyQuiz.svg" alt="quiz image"  height="200" width="260" priority>
            </div>
              <button class="card__options-btn" (click)="toggleOptions()"><i class="fa-solid fa-ellipsis"></i></button>
<!-- OPTIONS -->
              <div class="card__options" (click)="onBackgroundClick($event)">
                  <button class="add" (click)="addQuestion()"><i class="fa-solid fa-plus"></i></button>
                  <button class="edit" (click)="editQuestion()"><i class="fa-regular fa-pen-to-square"></i></button>
                  <!--<button class="delete"><i class="fa-solid fa-trash-can"></i></button>-->
              </div>  
            </div>
            <div class="card__content">
                <p>{{ nbQuestions}} question(s)</p>
                <div class="card__content-footer">
                    <i class="fa-solid fa-bullseye"></i>
                    <p>Success rate: {{ successRate }}% </p>
                    <button class="play-btn" (click)="goToQuiz()"><i class="fa-solid fa-play"></i></button>
                </div>
            </div>
        </div>
      </div>
    </section>

 <!-- FOOTER -->
   <footer>
        <div class="footer__container container">
          <div class="footer__header">
            <a (click)="goHome()"><h1 class="logo">AnimeQuiz</h1></a>
          </div>
          <div class="footer__links">
            <ul>
                @for (obj of referenceLinksArray; track obj.name) {
                  <li><a [href]="obj.link" target="_blank">{{ obj.name }}</a></li>
                }
            </ul>
          </div>
        </div>
    </footer> 
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private router: Router, private quizService: QuizService){}
  // XP for user profile
  userXP = 0;
  nbQuestions = 0;
  successRate = 0;
  isAddQuestionVisible = false;
  dataQuestions: Array<Quiz> = [];
  
  ngOnInit(): void {
    this.dataQuestions = this.quizService.getDataQuestions();
    this.nbQuestions = this.dataQuestions.length;
  }


  /*=== Redirecte functions ====*/
  goToQuiz(): void {
    this.router.navigate(['/quiz']);
  }
  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  /*=== Toggle Handling ====*/
  toggleOptions(): void {
    const cardOptionsElement = document.querySelector('.card__options');
    if(cardOptionsElement?.classList.contains("visible")) {
      cardOptionsElement.classList.remove("visible");
    } else {
      cardOptionsElement?.classList.add("visible");
    }
  }
   
  editQuestion(): void {
    this.router.navigate(['/edit-question']);
  }

  addQuestion(): void {
    this.isAddQuestionVisible = !this.isAddQuestionVisible;
    // Close options
    this.toggleOptions();
  }

  goHome(): void {
    this.router.navigate(['']);
  }

  /*=== Close the pop-up if the background is clicked ====*/
  onBackgroundClick(event: MouseEvent): void {
    if(event.target == event.currentTarget){
      this.toggleOptions();
    }
  }
  

  

  /*=== Array of {linkToRef, name} // Put it into a service: For Footer ===*/
  referenceLinksArray = [
    { link: "https://angular.dev/guide/routing", name: "Routing" },
    { link: "https://angular.dev/guide/forms", name: "Forms" },
    { link: "https://angular.dev/guide/http", name: "Http Client" },
    { link: "https://angular.dev/guide/di", name: "Injection" },
    { link: "https://angular.dev/style-guide", name: "Style Guide"},
    { link: "https://opentdb.com/api.php?amount=20&category=31&difficulty=medium&type=multiple", name: "Quiz API" },

];

}

