import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isOpen = false;
  registerForm: FormGroup;


  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
    }, 3000);

    this.initForm();
  }

  private initForm(): void {
    this.registerForm = new FormGroup({
      lmao: new FormControl(null, [
        // Validators.minLength(2),
        // Validators.pattern
      ]),
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ])
    }, {updateOn: 'blur'});
  }

  get title() {
    return this.registerForm.get('title');
  }

  get lmao() {
    return this.registerForm.get('lmao');
  }
}
