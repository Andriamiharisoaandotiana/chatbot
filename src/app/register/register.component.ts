// register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule] // Ajouter FormsModule au tableau imports
})
export class RegisterComponent {
  userData = {
    username: '',
    email: '',
    password: '',
    pseudo: '',
    role: '[USER_ROLE]'
  };

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    this.authService.register(this.userData).subscribe({
      next: (response) => {
        console.log('Inscription réussie', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erreur d’inscription', error);
      }
    });
  }
}