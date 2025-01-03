import { Component,NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage],
  template: `
<!-- ======================== NAVBAR =============================-->

    <nav>
        <div class="nav__container container">
            <a href=""><h1>AnimeQuiz</h1></a>
            <div class="profile__container">
              <a href=""><img ngSrc="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" width="45" height="45"></a>
            </div>
        </div>
    </nav>

<!-- ======================== HOMECOMPONENT =============================-->
<router-outlet />

<!-- ======================== FOOTER =============================-->
    <footer>
          <div class="footer__container container">
                <div class="footer__header">
                  <a href=""><h1>AnimeQuiz</h1></a>
                </div>
                <div class="footer__links">
                  <ul>
                      @for (obj of referenceLinksArray; track obj.name) {
                        <li><a [href]="obj.link">{{ obj.name }}</a></li>
                      }
                  </ul>
                </div>
          </div>
    </footer>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Array of {linkToRef, name} // Put it into a service
  referenceLinksArray = [
    { link: "", name: "Router" },
    { link: "", name: "Forms" },
    { link: "", name: "Http" },
    { link: "", name: "API" }
];
}
