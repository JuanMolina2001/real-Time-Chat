import { Component ,Input } from '@angular/core';
import { timeout } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core'
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})

export class ModalComponent {
  @Input() title?: string;
  @Input() message?: string;
  modal: any = document.getElementsByClassName('modal');
  aShow: any = document.getElementsByClassName('aShow');
  click: any = document.getElementsByClassName('click');


  show(): void {
    const modal = this.modal[0]
    this.aShow[0].play();
    modal.classList.add('show');
    modal.classList.add('animation');
    setTimeout(() => {
      modal.classList.remove('animation');
    }, 1000);
    
  }
  close() {
    const modal = this.modal[0]
    this.click[0].play();
    modal.classList.remove('show');
  }


}
