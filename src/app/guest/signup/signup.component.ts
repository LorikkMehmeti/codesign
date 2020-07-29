import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user/user.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isOpen = false;
  registerForm: FormGroup;
  activeToast: any;


  constructor(private router: Router, private userService: UserService, private toast: ToastrService) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern(`^[A-Za-z]+((\\s)?((\\'|\\-|\\.)?([A-Za-z])+))*$`)
      ]),
      lastName: new FormControl(null, [
        Validators.minLength(2),
        Validators.maxLength(20),
        // Validators.pattern('^[A-Za-z][A-Za-z0-9]*$')
      ]),
      username: new FormControl(null, [
        Validators.minLength(5),
        Validators.maxLength(15)
        // Validators.pattern
      ]),
      email: new FormControl(null, [
        Validators.minLength(2),
        // Validators.pattern
      ]),
      password: new FormControl(null, [
        Validators.minLength(8),
        Validators.maxLength(20)
        // Validators.pattern
      ]),
      // type: new FormControl(1, [
      //   Validators.required
      // ])
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


  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onSubmit() {
    if (this.registerForm.invalid) { return; }
    const body = {
      first_name: this.capitalize(this.firstName.value.trim()),
      last_name: this.capitalize(this.lastName.value.trim()),
      username: this.username.value.toLowerCase().trim(),
      email: this.email.value.toLowerCase().trim(),
      password: this.password.value.trim()
    };

    this.activeToast = this.toast.show(`Connecting with the server to get you register`, 'Loading', {
      toastClass: 'warning-toast'
    });

    this.userService.registerUser(body).subscribe((res: any) => {
      if (res.success) {
        this.activeToast = this.toast.show(`Register is done`, 'Success', {
          toastClass: 'success-toast'
        });
        this.registerForm.reset();
        this.router.navigate(['/login']);
      }
    });

  }
}
