import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:8080/api',
      timeout: 10000, // Optionnel : définir un délai d'attente
    });
  }

  getData(endpoint: string) {
    console.log(
      `Sending GET request to ${this.axiosInstance.defaults.baseURL}${endpoint}`
    );
    return this.axiosInstance
      .get(endpoint)
      .then((response: any) => {
        console.log('Response received:', response);
        return response.data;
      })
      .catch((error: any) => {
        console.error('Erreur lors de la récupération des données get ', error);
        throw error;
      });
  }

  postData(endpoint: string, data: any) {
    return this.axiosInstance
      .post(endpoint, data)
      .then((response: any) => {
        console.log('Response received:', response);
        return response.data;
      })
      .catch((error: any) => {
        console.error('Erreur lors de la récupération des données post', error);
        throw error;
      });
  }

  postVoice(file: any) {
    const formData = new FormData();
    formData.append('audio', file); // Assurez-vous que le serveur attend un champ "file"
  
    return this.axiosInstance
      .post("http://127.0.0.1:5000/voice_chat", file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response: any) => {
        console.log('Response received:', response);
        return response.data;
      })
      .catch((error: any) => {
        console.error('Erreur lors de l’envoi du fichier audio', error);
        throw error;
      });
  }
  
  
}
