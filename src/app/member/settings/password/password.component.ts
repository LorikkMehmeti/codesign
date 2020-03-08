import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup;

  activeToast: any;

  constructor(private userService: UserService, private toast: ToastrService) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.passwordForm = new FormGroup({
      old_password: new FormControl(null, [
        Validators.required
        // Validators.pattern(email + '?' + username)
      ]),
      new_password: new FormControl(null, [
        Validators.required,
        // Validators.minLength(4),
      ]),
    });
  }

  get oldPassword() {
    return this.passwordForm.get('old_password');
  }

  get newPassword() {
    return this.passwordForm.get('new_password');
  }

  updatePassword(): void {
    if (this.passwordForm.invalid) {
      return;
    }

    const body = {
      old_password: this.oldPassword.value,
      new_password: this.newPassword.value
    };

    this.userService.updatePassword(body).subscribe((res: any) => {
      if (res.success) {
        this.activeToast = this.toast.show(`${res.message}`, 'Success');

        this.activeToast.toastRef.componentInstance.type = 'success';
        this.activeToast.toastRef.componentInstance.toastActive = true;
        this.passwordForm.reset();
      } else {
        this.activeToast = this.toast.show(`${res.message}`, 'Success');

        this.activeToast.toastRef.componentInstance.type = 'error';
        this.activeToast.toastRef.componentInstance.toastActive = true;
      }

    });
  }

}
