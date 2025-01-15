import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExampleComponent } from './example/example.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  imports: [
    ExampleComponent,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    NavBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo';
}
