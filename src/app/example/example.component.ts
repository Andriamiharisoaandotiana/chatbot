import { Component, OnInit, NgModule } from '@angular/core';
import { ApiService } from '../api.service'; // Assurez-vous que ce service est correct
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-example',
  standalone: true, 
  imports:[CommonModule, FormsModule], // Le sélecteur à utiliser dans le HTML
  templateUrl: './example.component.html', // Fichier HTML du composant
  styleUrls: ['./example.component.scss']   // Fichier CSS du composant
})
export class ExampleComponent implements OnInit {
  data: any;
  message: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData('/chat')
      .then(data => {
        this.data = data;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données', error);
      });
  }

  sendMessage() {
    if (this.message.trim()) {  // Vérifie que le message n'est pas vide
      const data = { message: this.message };

      this.apiService.postData('/chat', data)  // Appel à l'API avec les données
        .then(response => {
          console.log('Message envoyé avec succès:', response);
          this.message = '';  // Réinitialiser l'input après envoi
        
          this.apiService.getData('/chat')
          .then(data => {
            this.data = data;
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des données', error);
          });
        
        })
        .catch(error => {
          console.error('Erreur lors de l\'envoi du message:', error);
        });
    } else {
      console.log('Veuillez entrer un message');
    }
  }
}
