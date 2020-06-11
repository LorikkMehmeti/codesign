import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {TokenService} from '../../shared/services/token.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NgxSmartModalService} from 'ngx-smart-modal';


const emailUsernamePattern = /(?:[A-Z\d][A-Z\d_-]{5,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})/;
const username = /(^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$)/;

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
export class LoginComponent implements OnInit, OnDestroy {
  isOpen = false;
  login: FormGroup;
  subscription: Subscription;

  constructor(
    private router: Router,
    private toast: ToastrService,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.login = new FormGroup({
      username: new FormControl(null, [
        Validators.required
        // Validators.pattern(email + '?' + username)
      ]),
      password: new FormControl(null, [
        Validators.required,
        // Validators.minLength(4),
      ])
    });
  }

  get username() {
    return this.login.get('username');
  }

  get password() {
    return this.login.get('password');
  }

  togglePopUp() {
    this.isOpen = !this.isOpen;
  }

  ngOnDestroy() {
  }

  getUser() {
    const user = this.tokenService.getUserFromToken();

    console.log(user);
  }

  onSubmit(): void {
    const loginData = this.login.value;
    if (!this.login.valid) {
      console.log('nope');
      return;
    }
    this.subscription = this.authenticationService
      .login(this.username.value, this.password.value)
      .subscribe((response: any) => {
        // window.location.reload();
        if (!response.success) {
          this.toast.show(`Login error`, 'Error', {
            toastClass: 'error-toast'
          });

          this.password.reset();
        }

        if (response.success) {
          this.toast.show(`${response.data.message}`, 'Success', {
            toastClass: 'success-toast'
          });

          this.router.navigate(['/home']);
        }
      }, (error) => {
        this.toast.show(`Service unavailable`, 'Error 503', {
          toastClass: 'error-toast'
        });
      });
  }


}
