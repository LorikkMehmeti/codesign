import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {TokenService} from '../../shared/services/token.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';


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
    setTimeout(() => {
      this.togglePopUp();
    }, 3000);

    this.initForm();
  }

  private initForm(): void {
    this.login = new FormGroup({
      username: new FormControl(null, [
        // Validators.minLength(2),
        // Validators.pattern(email + '?' + username)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ])
    }, {updateOn: 'blur'});
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
    this.subscription = this.authenticationService
      .login(loginData.username, loginData.password)
      .subscribe(response => {
        // window.location.reload();
        if (!response.success) {
          const activeToast = this.toast.error(`${response.error}`, 'error', {
            toastClass: 'error_TOAST'
          });
          activeToast.toastRef.componentInstance.type = 'error';
          activeToast.toastRef.componentInstance.toastActive = true;
        }

        if (response.success) {
          const activeToast = this.toast.show(`${response.data.message}`, 'success', {
            toastClass: 'success_TOAST'
          });
          activeToast.toastRef.componentInstance.type = 'success';
          activeToast.toastRef.componentInstance.toastActive = true;

          this.router.navigate(['/home']);
        }
      }, (error) => {
        throw(error);
      });
  }


}
