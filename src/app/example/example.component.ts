import {
  Component,
  OnInit,
  NgModule,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ApiService } from '../api.service'; // Assurez-vous que ce service est correct
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
  ], // Le sélecteur à utiliser dans le HTML
  templateUrl: './example.component.html', // Fichier HTML du composant
  styleUrls: ['./example.component.scss'], // Fichier CSS du composant
})
export class ExampleComponent implements OnInit {
  data: any;
  message: string = '';
  isLoading: boolean = false; // Indicateur de chargement
  chatbotResponse: string = ''; // Réponse du chatbot
  faMicrophone = faMicrophone;
  @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.apiService
      .getData('/chat')
      .then((data) => {
        this.data = data;
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données', error);
      });
  }

  sendMessage() {
    if (this.message.trim()) {
      // Vérifie que le message n'est pas vide
      const data = { message: this.message };

      this.isLoading = true;
      this.apiService
        .postData('/chat', data) // Appel à l'API avec les données
        .then((response) => {
          console.log('Message envoyé avec succès:', response);
          this.message = ''; // Réinitialiser l'input après envoi
          // Met à jour le DOM avant de scroller
          this.cdr.detectChanges();
          setTimeout(() => this.scrollToBottom(), 0);

          this.apiService
            .getData('/chat')
            .then((data) => {
              this.data = data;
            })
            .catch((error) => {
              console.error(
                'Erreur lors de la récupération des données',
                error
              );
            });
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi du message:", error);
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
  scrollToBottom() {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Erreur lors du scroll :', err);
    }
  }
  onMicrophoneClick(): void {
    console.log('Microphone icon clicked!');
    // Ajoutez votre logique ici
  }
}
