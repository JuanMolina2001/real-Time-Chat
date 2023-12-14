import { Component } from '@angular/core';
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import { ResolveData } from '@angular/router';
const app = initializeApp(environment.firebase);
const database = getDatabase(app);


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  id?: string
  mensaje?: string
  id_user_to?: string
  id_user_from?: string
  fecha: Date = new Date()
 
  sendMessages() {
    set(ref(database, 'messages/' + this.id), {
      id: this.id,
      mensaje: this.mensaje,
      id_user_to: this.id_user_to,
      id_user_from: this.id_user_from,
      date: this.fecha
    });
  }


     
   
  

}
