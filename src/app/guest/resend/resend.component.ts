import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user/user.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-resend',
  templateUrl: './resend.component.html',
  styleUrls: ['./resend.component.scss']
})
export class ResendComponent implements OnInit, OnDestroy {
  resend: FormGroup;

  sub: Subscription;

  constructor(private router: Router,
              private toast: ToastrService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private initForm(): void {
    this.resend = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        // Validators.pattern(email + '?' + username)
      ])
    });
  }

  onSubmit() {
    if (this.resend.invalid) {
      return;
    }

    const body = {
      email: this.resend.get('email').value
    };

    this.sub = this.userService.resend(body).subscribe((res) => {
      this.toast.show(`Check your email`, 'Success', {
        toastClass: 'success-toast'
      });

      this.resend.reset();
      this.router.navigate(['/']);
    });
  }
}
