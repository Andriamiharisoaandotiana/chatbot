import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
  ],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit, AfterViewChecked {
  data: any[] = []; // Tableau des messages
  message: string = '';
  isLoading: boolean = false;
  chatbotResponse: string = '';
  faMicrophone = faMicrophone;

  @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadChatData();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  /**
   * Charge les données du chat depuis l'API.
   */
  private loadChatData(): void {
    this.apiService
      .getData('/chat')
      .then((data) => {
        this.data = data;
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données', error);
      });
  }

  /**
   * Envoie un message et met à jour les données du chat.
   */
  sendMessage(): void {
    if (this.message.trim()) {
      const data = { message: this.message };

      this.isLoading = true;
      this.apiService
        .postData('/chat', data)
        .then((response) => {
          console.log('Message envoyé avec succès:', response);
          this.message = ''; // Réinitialiser l'input après envoi
          this.data.push(response); // Ajouter le nouveau message
        })
        .catch((error) => {
          console.error('Erreur lors de l’opération:', error);
        })
        .finally(() => {
          this.isLoading = false; // Arrêter le chargement
          this.scrollToBottom();
        });
    } else {
      console.log('Veuillez entrer un message');
    }
  }

  generateResponse(): void {
    this.isLoading = true; // Démarrer le chargement
    this.chatbotResponse = '';

    // Simuler un appel à l'API
    setTimeout(() => {
      this.chatbotResponse = 'Voici la réponse du chatbot.';
      this.isLoading = false; // Arrêter le chargement
    }, 2000); // Simule une latence de 2 secondes
  }
  /**
   * Fait défiler le conteneur de chat vers le bas.
   */
  scrollToBottom(): void {
    try {
      if (this.chatContainer?.nativeElement) {
        const container = this.chatContainer.nativeElement;
        container.scrollTop = container.scrollHeight; // Défiler en bas
      }
    } catch (err) {
      console.error('Erreur lors du scroll :', err);
    }
  }

  /**
   * Gestion de l'icône microphone.
   */
  onMicrophoneClick(): void {
    console.log('Microphone icon clicked!');
    // Ajoutez votre logique ici
  }
}
