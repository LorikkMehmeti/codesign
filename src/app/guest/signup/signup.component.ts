import {Component, OnInit} from '@angular/core';
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
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, [
        // Validators.minLength(2),
        // Validators.pattern
      ]),
      lastName: new FormControl(null, [
        // Validators.minLength(2),
        // Validators.pattern
      ]),
      username: new FormControl(null, [
        // Validators.minLength(2),
        // Validators.pattern
      ]),
      email: new FormControl(null, [
        // Validators.minLength(2),
        // Validators.pattern
      ]),
      password: new FormControl(null, [
        Validators.minLength(8),
        // Validators.pattern
      ]),
      type: new FormControl(1, [
        Validators.required
      ])
    }, {updateOn: 'blur'});
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get type() {
    return this.registerForm.get('type');
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }
}
