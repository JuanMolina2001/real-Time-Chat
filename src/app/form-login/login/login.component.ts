

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ModalComponent } from '../../modal/modal.component';

const app = initializeApp(environment.firebase);
const auth = getAuth(app);


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ModalComponent],
  templateUrl: './login.component.html',
  styleUrl: '../styles-form.css'
})

export class LoginComponent {
  modal = new ModalComponent()
  constructor(private router: Router) { }
  auth = auth;
  email?: string;
  password?: string;
  state: string = 'Crea una cuenta'
  titleModal?: string
  messageModal?: string


modalShow(title: string, message:string): void {
  this.titleModal = title
  this.messageModal = message
  this.modal.show()
}

  loguearse(): void {
    if (this.email != undefined && this.password != undefined && this.email != "" && this.password != "") {
      signInWithEmailAndPassword(this.auth, this.email, this.password).then((userCredential) => {
        const user = userCredential.user;
        alert("Bienvenido " + user?.displayName)
      }).catch((error) => {
        
        this.modalShow("Error","Usuario o contraseña incorrectos")
      })
    } else {
      this.modalShow("Error","Ingrese un correo y una contraseña")
      
    }
  }
}
