import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user/user.service';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
// import {isUndefined} from 'util';
import {TitleService} from '../../../shared/services/title.service';

@Component({
  selector: 'app-settingsprofile',
  templateUrl: './settingsprofile.component.html',
  styleUrls: ['./settingsprofile.component.scss']
})
export class SettingsprofileComponent implements OnInit {

  account: FormGroup;
  user: any;

  constructor(private title: TitleService, private userService: UserService, private toast: ToastrService) {
  }

  ngOnInit() {
    // activeToast.toastRef.componentInstance.toastActive = true;

    this.initForm();

    this.getUser();

    this.title.setTitle(`Profile Settings`);
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
      biography: new FormControl(null),
      skills: new FormControl(null)
    });
  }

  get firstname() {
    return this.account.get('first_name');
  }

  get lastname() {
    return this.account.get('last_name');
  }

  get biography() {
    return this.account.get('biography');
  }

  get skills() {
    return this.account.get('skills');
  }

  getUser() {
    this.userService.getAuthUser(true).subscribe((res: any) => {
      this.user = res.data;
      this.updateForm();
    });
  }

  updateForm() {
    const user = this.user;
    if (this.user) {
      this.account.patchValue({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        biography: user.profile.biography,
        skills: user.profile.skills
      });
    }
  }


  updateInfo() {
    const isVerified: any = this.userService.isVerified();

    if (this.account.invalid) {
      return;
    }



    const body = {
      first_name: this.firstname.value,
      last_name: this.lastname.value,
      biography: this.biography.value,
      skills: this.skills.value
    };

    this.userService.updateInfo(body).subscribe((res: any) => {
      if (res.success) {
        this.toast.show(`${res.message}`, 'Updated', {
          toastClass: 'success-toast'
        });
      }
      if (!res.success) {
        this.toast.show(`${res.message}`, 'Error', {
          toastClass: 'error-toast'
        });
      }
    });
  }
}
