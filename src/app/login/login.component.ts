// import { Component } from '@angular/core';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss',
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   onLogin(): void {
//     this.authService
//       .login({ email: this.email, password: this.password })
//       .subscribe(
//         (response) => {
//           this.authService.saveToken(response.token);
//           this.router.navigate(['/dashboard']); // Rediriger après connexion
//         },
//         (error) => {
//           console.error('Erreur de connexion', error);
//           alert('Email ou mot de passe incorrect');
//         }
//       );
//   }
// }
