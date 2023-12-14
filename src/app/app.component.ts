import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './form-login/login/login.component';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
  title = 'chatAngular';
  music: any = document.getElementsByClassName('music');
 
  mute(){
    this.music[0].muted = !this.music[0].muted;
  }
  volume(){
    this.music[0].volume = 0.5;
  }
}
