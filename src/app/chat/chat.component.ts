// import { CommonModule } from '@angular/common';
// import {
//   ChangeDetectorRef,
//   Component,
//   ElementRef,
//   ViewChild,
// } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ApiService } from '../api.service';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-chat',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatProgressSpinnerModule,
//     MatSlideToggleModule,
//   ],
//   templateUrl: './chat.component.html',
//   styleUrl: './chat.component.css',
// })
// export class ChatComponent {
//   data: any[] = []; // Tableau des messages
//   message: string = '';
//   isLoading: boolean = false;
//   chatbotResponse: string = '';
//   faMicrophone = faMicrophone;
//   isRecording: boolean = false;
//   mediaRecorder!: MediaRecorder;
//   audioChunks: Blob[] = [];
//   audioFile?: File;

//   /*login */
//   token: string = '';
//   isConnected: boolean = false;
//   email = '';
//   password = '';
//   loginError = '';
//   username = '';

//   /**sigin */
//   isSigin: boolean = false;

//   @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;

//   constructor(
//     private apiService: ApiService,
//     private cdr: ChangeDetectorRef,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.getAllMessage(); // Appel de getAllMessage() ici
//     this.token = localStorage.getItem('token') || '';
//     this.isConnected = this.token.length > 0;
//   }

//   /**sigin */
//   onSigin(): void {
//     if (this.isSigin === true) {
//       this.isSigin = false;
//     } else {
//       this.isSigin = true;
//     }
//   }

//   ngAfterViewChecked(): void {
//     this.scrollToBottom();
//   }

//   /**
//    * Charge les données du chat depuis l'API.
//    */
//   getAllMessage(): void {
//     this.apiService
//       .getData('/chat')
//       .then((data) => {
//         this.data = data;
//       })
//       .catch((error) => {
//         console.error('Erreur lors de la récupération des données', error);
//       });
//   }

//   /**
//    * Envoie un message et met à jour les données du chat.
//    */
//   sendMessage(): void {
//     if (this.message.trim()) {
//       const data = { message: this.message };

//       this.isLoading = true;
//       this.apiService
//         .postData('/chat', data)
//         .then((response) => {
//           console.log('Message envoyé avec succès:', response);
//           this.message = ''; // Réinitialiser l'input après envoi
//           this.data.push(response); // Ajouter le nouveau message
//           this.getAllMessage(); // Mettre à jour les messages après l'envoi
//         })
//         .catch((error) => {
//           console.error('Erreur lors de l’opération:', error);
//         })
//         .finally(() => {
//           this.isLoading = false; // Arrêter le chargement
//           this.scrollToBottom();
//         });
//     } else {
//       console.log('Veuillez entrer un message');
//     }
//   }

//   generateResponse(): void {
//     this.isLoading = true; // Démarrer le chargement
//     this.chatbotResponse = '';

//     // Simuler un appel à l'API
//     setTimeout(() => {
//       this.chatbotResponse = 'Voici la réponse du chatbot.';
//       this.isLoading = false; // Arrêter le chargement
//     }, 2000); // Simule une latence de 2 secondes
//   }

//   /**
//    * Fait défiler le conteneur de chat vers le bas.
//    */
//   scrollToBottom(): void {
//     try {
//       if (this.chatContainer?.nativeElement) {
//         const container = this.chatContainer.nativeElement;
//         container.scrollTop = container.scrollHeight; // Défiler en bas
//       }
//     } catch (err) {
//       console.error('Erreur lors du scroll :', err);
//     }
//   }

//   /**
//    * Gestion de l'icône microphone.
//    */
//   onMicrophoneClick(): void {
//     console.log('Microphone icon clicked!');
//     alert('Commencez à parler...');
//   }

//   async startRecording() {
//     this.isRecording = true;
//     this.audioChunks = [];

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//       this.mediaRecorder = new MediaRecorder(stream, {
//         mimeType: 'audio/webm', // Remplace 'audio/wav' par 'audio/webm'
//       });

//       console.log('Format enregistré :', this.mediaRecorder.mimeType);

//       this.mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           this.audioChunks.push(event.data);
//         }
//       };

//       this.mediaRecorder.onstop = () => {
//         this.sendAudio();
//       };

//       this.mediaRecorder.start();
//     } catch (error) {
//       console.error('Erreur d’accès au micro :', error);
//     }
//   }
//   stopRecording() {
//     if (this.mediaRecorder) {
//       this.mediaRecorder.stop();
//       this.isRecording = false;
//     }
//   }

//   sendAudio() {
//     if (this.audioChunks.length === 0) return;

//     const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
//     const audioFile = new File([audioBlob], 'recorded_audio.webm', {
//       type: 'audio/webm',
//     });

//     console.log('Format du fichier audio:', audioFile.type);
//     const formData = new FormData();
//     formData.append('audio', audioFile);

//     this.apiService
//       .postVoice(formData)
//       .then((response) => {
//         console.log('Réponse du serveur:', response);
//         this.data;
//         this.getAllMessage(); // Appel de this.getAllMessage() ici
//       })
//       .catch((error) => {
//         console.error('Erreur lors de l’envoi du fichier audio:', error);
//       });
//   }

//   login() {
//     this.loginError = ''; // Reset error message

//     this.authService
//       .login({ email: this.email, password: this.password })
//       .subscribe({
//         next: (response) => {
//           if (response && response.token) {
//             localStorage.setItem('token', response.token);
//             this.isConnected = true;
//             location.reload();
//           } else {
//             this.loginError = 'Réponse invalide du serveur.';
//           }
//         },
//         error: (error) => {
//           if (error.status === 401) {
//             this.loginError = 'Identifiants incorrects.';
//           } else {
//             this.loginError = 'Erreur de connexion : ' + error.message;
//           }
//         },
//       });
//   }

//   sigin() {
//     this.loginError = ''; // Reset error message

//     this.authService
//       .register({
//         email: this.email,
//         password: this.password,
//         username: this.username,
//       })
//       .subscribe({
//         next: (response) => {
//           if (response && response.token) {
//             location.reload();
//           } else {
//             this.loginError = 'Réponse invalide du serveur.';
//           }
//         },
//         error: (error) => {
//           if (error.status === 401) {
//             this.loginError = 'Identifiants incorrects.';
//           } else {
//             this.loginError = 'Erreur de connexion : ' + error.message;
//           }
//         },
//       });
//   }
// }

import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  data: any[] = [];
  message: string = '';
  isLoading: boolean = false;
  chatbotResponse: string = '';
  faMicrophone = faMicrophone;
  isRecording: boolean = false;
  mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];
  audioFile?: File;

  token: string = '';
  isConnected: boolean = false;
  email = '';
  password = '';
  loginError = '';
  username = '';

  isSigin: boolean = false;

  @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllMessage();
    this.token = localStorage.getItem('token') || '';
    this.isConnected = this.token.length > 0;
  }

  onSigin(): void {
    if (this.isSigin === true) {
      this.isSigin = false;
    } else {
      this.isSigin = true;
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  getAllMessage(): void {
    this.apiService
      .getData('/chat')
      .then((data) => {
        this.data = data;
        this.cdr.detectChanges(); // Mettre à jour l'affichage
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données', error);
      });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      const data = { message: this.message };

      this.isLoading = true;
      this.apiService
        .postData('/chat', data)
        .then((response) => {
          console.log('Message envoyé avec succès:', response);
          this.message = '';
          this.data.push(response);
          this.getAllMessage();
        })
        .catch((error) => {
          console.error('Erreur lors de l’opération:', error);
        })
        .finally(() => {
          this.isLoading = false;
          this.scrollToBottom();
        });
    } else {
      console.log('Veuillez entrer un message');
    }
  }

  generateResponse(): void {
    this.isLoading = true;
    this.chatbotResponse = '';

    setTimeout(() => {
      this.chatbotResponse = 'Voici la réponse du chatbot.';
      this.isLoading = false;
    }, 2000);
  }

  scrollToBottom(): void {
    try {
      if (this.chatContainer?.nativeElement) {
        const container = this.chatContainer.nativeElement;
        container.scrollTop = container.scrollHeight;
      }
    } catch (err) {
      console.error('Erreur lors du scroll :', err);
    }
  }

  onMicrophoneClick(): void {
    console.log('Microphone icon clicked!');
    alert('Commencez à parler...');
  }

  async startRecording() {
    this.isRecording = true;
    this.audioChunks = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });

      console.log('Format enregistré :', this.mediaRecorder.mimeType);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        this.sendAudio();
      };

      this.mediaRecorder.start();
    } catch (error) {
      console.error('Erreur d’accès au micro :', error);
    }
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }

  sendAudio() {
    if (this.audioChunks.length === 0) return;

    const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
    const audioFile = new File([audioBlob], 'recorded_audio.webm', {
      type: 'audio/webm',
    });

    console.log('Format du fichier audio:', audioFile.type);
    const formData = new FormData();
    formData.append('audio', audioFile);

    // Ajouter l'enregistrement audio au tableau data
    this.data.push({ type: 'audio', file: audioFile });
    this.cdr.detectChanges(); // Mettre à jour l'affichage immédiatement

    this.apiService
      .postVoice(formData)
      .then((response) => {
        console.log('Réponse du serveur:', response);
        this.getAllMessage();
      })
      .catch((error) => {
        console.error('Erreur lors de l’envoi du fichier audio:', error);
      });
  }

  login() {
    this.loginError = '';

    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.isConnected = true;
            location.reload();
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

  sigin() {
    this.loginError = '';

    this.authService
      .register({
        email: this.email,
        password: this.password,
        username: this.username,
      })
      .subscribe({
        next: (response) => {
          if (response && response.token) {
            location.reload();
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
