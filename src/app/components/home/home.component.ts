import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <section>
      <div class="home__container container">
           <div class="home__content">
              <button type="button">Ready Quiz !</button>
           </div>
      </div>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
