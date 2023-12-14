import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [LoginComponent,RegisterComponent,ModalComponent],
  templateUrl: './menu.component.html',
  styleUrl: '../styles-form.css'
})
export class MenuComponent {

}
