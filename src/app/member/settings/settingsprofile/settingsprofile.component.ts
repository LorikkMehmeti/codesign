import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user/user.service';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-settingsprofile',
  templateUrl: './settingsprofile.component.html',
  styleUrls: ['./settingsprofile.component.scss']
})
export class SettingsprofileComponent implements OnInit {

  account: FormGroup;
  user: any;

  constructor(private userService: UserService, private toast: ToastrService) {
  }

  ngOnInit() {
    this.initForm();

    this.getUser();
  }

  private initForm(): void {
    this.account = new FormGroup({
      first_name: new FormControl(null, [
        Validators.required
        // Validators.pattern(email + '?' + username)
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        // Validators.minLength(4),
      ]),
      username: new FormControl({value: null, disabled: true}, [
        // Validators.required,
        // Validators.minLength(4),
      ]),
    });
  }

  get firstname() {
    return this.account.get('first_name');
  }

  get lastname() {
    return this.account.get('last_name');
  }

  getUser() {
    this.userService.getAuthUser().subscribe((res: any) => {
      this.user = res.data;
      console.log(this.user);
      this.updateForm();
    });
  }

  updateForm() {
    const user = this.user;
    if (this.user) {
      this.account.patchValue({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username
      });
    }
  }


  updateInfo() {
    const body = {
      first_name: this.firstname.value,
      last_name: this.lastname.value
    };

    this.userService.updateInfo(body).subscribe((res: any) => {
      if (res.success) {
        const activeToast = this.toast.show(`${res.message}`, 'Updated', {
          toastClass: 'success_TOAST'
        });
        activeToast.toastRef.componentInstance.type = 'success';
        activeToast.toastRef.componentInstance.toastActive = true;
      }
    });
  }
}
