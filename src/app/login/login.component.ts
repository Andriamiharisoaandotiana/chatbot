import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import AuthService
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
  standalone: true,
})
export class LoginComponent {
  username = '';
  password = '';
  loginError = '';

  constructor(private router: Router, private authService: AuthService) {} // Inject AuthService

  login() {
    this.loginError = ''; // Reset error message

    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/']);
          } else {
            this.loginError = 'Réponse invalide du serveur.';
          }
        },
        error: (error) => {
          if (error.status === 401) {
            this.loginError = 'Identifiants incorrects.';
          } else {
            this.loginError = 'Erreur de connexion : ' + error.message;
          }
        },
      });
  }
}