import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../shared/services/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  code: string;
  resetPassword: FormGroup;
  sub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private toast: ToastrService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.initForm();
      this.code = param.code;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  private initForm(): void {
    this.resetPassword = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
        // Validators.pattern(email + '?' + username)
      ])
    });
  }

  onSubmit() {
    if (this.resetPassword.invalid) {
      return;
    }

    const body = {
      password: this.resetPassword.get('password').value,
      code: this.code
    };

    this.sub = this.userService.resetPassword(body).subscribe((res) => {
      this.toast.show(`Your password is changed`, 'Success', {
        toastClass: 'success-toast'
      });

      this.resetPassword.reset();
      this.router.navigate(['/']);
    }, error => {
      this.toast.show(`The link is used or maybe expired`, 'Error', {
        toastClass: 'error-toast'
      });
    });
  }

}
