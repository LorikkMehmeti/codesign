import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('openClose', [
      state('false', style({opacity: '0', transform: 'translateY(30px)'})),
      state('true', style({opacity: '1', transform: 'translateY(0)'})),
      transition('false <=> true', animate(500))
    ])
  ],
})
export class LoginComponent implements OnInit {
  isOpen = false;

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
      this.togglePopUp();
    }, 3000);
  }

  togglePopUp() {
    this.isOpen = !this.isOpen;
  }


}
