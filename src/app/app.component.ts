import { Component,NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
<!-- ======================== HOMECOMPONENT =============================-->
<router-outlet />

  `,
  styleUrl: './app.component.css'
})

export class AppComponent {
 
}
