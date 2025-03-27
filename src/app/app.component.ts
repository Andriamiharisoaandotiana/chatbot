import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'; // Import Router
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ChatComponent } from './chat/chat.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LoginComponent } from './login/login.component'; // Import LoginComponent

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavBarComponent,
    ChatComponent,
    MatProgressSpinner,
    NavBarComponent,
    LoginComponent, // Add LoginComponent to imports
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'chatbot';
  token: string = '';
  isLoggedIn: boolean = false; // Add isLoggedIn property

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.isLoggedIn = this.token.length > 0; // Set isLoggedIn to true if token exists
    console.log("===>",this.token.length > 0);
  }

  
}