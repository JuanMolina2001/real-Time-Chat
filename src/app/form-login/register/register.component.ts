import { Component } from '@angular/core';
import { createUserWithEmailAndPassword, updateProfile, } from "firebase/auth";
import { getFirestore, collection, setDoc, doc, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ModalComponent } from '../../modal/modal.component';
const app = initializeApp(environment.firebase);
const auth = getAuth(app);
const db = getFirestore(app);


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ModalComponent],
  templateUrl: './register.component.html',
  styleUrl: '../styles-form.css'
})

export class RegisterComponent {
  constructor(private router: Router) { }
  titleModal?: string
  messageModal?: string
  auth = auth;
  email?: any;
  password?: any;
  password2?: any;
  username?: string;
  state: number = 0;
  verificado: boolean = true;

  async userExist(): Promise<boolean> {
    const querySnapshot = getDocs(collection(db, "users"));

    let user = null
    await querySnapshot.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data()["email"] == this.email) {
          user = doc.data()
        }
      })
    })
    if (user != null) {
      return true
    } else {
      return false
    }
  }


  evaluatePassword(): boolean {
    if (this.password == "") {
      alert('ingrese una contrasena valida')
      return false;
    } else if (this.password != this.password2) {
      alert('las contrasenas no coinciden ' + this.password.length)
      return false;
    } else if (this.password?.length < 6) {
      alert('la contrasena debe tener al menos 6 caracteres')
      return false;
    }
    return true
  }

  async evaluateEmail(): Promise<boolean> {
    const exist = await this.userExist()
    if (this.email == undefined || this.email == "" || this.email?.includes('@') == false) {
      alert('ingrese un email valido')
      return false;
    } else if (exist) {
      alert('el email ya esta registrado')
      return false;
    }
    return true
  }


  async continue(): Promise<void> {
    const email = await this.evaluateEmail()
    if (email) {
      this.state = 1
    } if (this.state == 1 && this.password != undefined) {
      const pass = this.evaluatePassword()
      if (pass) {
        this.state = 2
        if (this.username != undefined) {
          this.registrarse()
        }
      }
    }
  }
  async agregarUsuario(user: any): Promise<void> {
    try {
      const docRef = await setDoc(doc(db, "users", user.uid), {
        username: user.displayName,
        email: user.email,
      });
      this.router.navigate(['/chat']);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }



  registrarse(): void {
    try {
      console.log(this.email, this.password, this.password2)
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: this.username,
          }).then(() => {
            this.agregarUsuario(user)
          }).catch((error) => {
            alert(error)
          });

        }).catch((error) => {
          alert(error)
        })
    } catch (error) {
      console.log(error)
    }
  }
}

