import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormControl, FormGroup, Validators} from '@angular/forms';


const emailUsernamePattern = /(?:[A-Z\d][A-Z\d_-]{5,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})/;
const username = /(^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$)/;
const email = /(^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$)/;

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
  test: FormGroup;


  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
      this.togglePopUp();
    }, 3000);

    this.initForm();
  }

  private initForm(): void {
    this.test = new FormGroup({
      lmao: new FormControl(null, [
        // Validators.minLength(2),
        Validators.pattern(email + '?' + username)
      ]),
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ])
    }, {updateOn: 'blur'});
  }

  get title() {
    return this.test.get('title');
  }

  get lmao() {
    return this.test.get('lmao');
  }

  togglePopUp() {
    this.isOpen = !this.isOpen;
  }


}
