import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  forgot: FormGroup;

  sub: Subscription;

  constructor(private router: Router,
              private toast: ToastrService,
              private userService: UserService) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  private initForm(): void {
    this.forgot = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        // Validators.pattern(email + '?' + username)
      ])
    });
  }

  onSubmit() {
    if (this.forgot.invalid) {
      return;
    }

    const body = {
      email: this.forgot.get('email').value
    };

    this.sub = this.userService.forgot(body).subscribe((res) => {
      this.toast.show(`Check your email`, 'Success', {
        toastClass: 'success-toast'
      });

      this.forgot.reset();
      this.router.navigate(['/']);
    });
  }



}
