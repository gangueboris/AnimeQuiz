import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage],
  template: `
  <!-- ======================== NAVBAR =============================-->
    <nav>
        <div class="nav__container container">
            <a href=""><h1>AnimeQuiz</h1></a>
            <div class="profile__container">
              <img ngSrc="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile" width="45" height="45" (click)="goToProfile()">
            </div>
        </div>
    </nav>

<!-- ======================== HOME =============================-->
    <section>
      <div class="home__container container">
           <div class="home__content">
              <div class="home__content-img">
                  <img ngSrc="/src/assets/img.jpg" alt="Ready Quiz" width="45" height="45">
              </div>
              <button type="button" (click)="goToQuiz()">Ready Quiz !</button>
           </div>
      </div>
    </section>

 <!-- ======================== FOOTER =============================-->
 <footer>
          <div class="footer__container container">
                <div class="footer__header">
                  <a href=""><h1>AnimeQuiz</h1></a>
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
export class HomeComponent {
  constructor(private router: Router){}

  // Redirection Functions
  goToQuiz() {
    this.router.navigate(['/quiz']);
  }
  goToProfile() {
    this.router.navigate(['/profile']);
  }

  // Array of {linkToRef, name} // Put it into a service: For Footer
  referenceLinksArray = [
    { link: "https://angular.dev/guide/routing", name: "Routing" },
    { link: "https://angular.dev/guide/forms", name: "Forms" },
    { link: "https://angular.dev/guide/http", name: "Http Client" },
    { link: "https://angular.dev/guide/di", name: "Injection" },
    { link: "https://angular.dev/style-guide", name: "Style Guide"},
    { link: "https://opentdb.com/api.php?amount=20&category=31&difficulty=medium&type=multiple", name: "Quiz API" },

];

}
