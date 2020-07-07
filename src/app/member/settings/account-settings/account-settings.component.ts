import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user/user.service';
import {TitleService} from '../../../shared/services/title.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Router} from '@angular/router';
import {TokenService} from '../../../shared/services/token.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  accountSettings: FormGroup;

  user: any;

  constructor(private tokenService: TokenService, private router: Router, public ngxSmartModalService: NgxSmartModalService, private title: TitleService, private userService: UserService) {
  }

  ngOnInit() {
    this.initForm();
    this.getUser();

    this.title.setTitle(`Account Settings`);
  }

  private initForm(): void {
    this.accountSettings = new FormGroup({
      username: new FormControl({value: null, disabled: true}, [
        Validators.required
        // Validators.pattern(email + '?' + username)
      ]),
      email: new FormControl({value: null, disabled: true}, [
        Validators.required,
        // Validators.minLength(4),
      ]),
    });
  }

  getUser() {
    this.userService.getAuthUser().subscribe((res: any) => {
      this.user = res.data;
      this.updateForm();
    });
  }

  updateForm() {
    const user = this.user;
    if (this.user) {
      this.accountSettings.patchValue({
        username: user.username,
        email: user.email
      });
    }
  }

  openDeleteModal() {
    this.ngxSmartModalService.getModal('myModal').open();
  }

  deleteDesign() {
    this.userService.deleteUser().subscribe((res: any) => {
      this.tokenService.deleteToken();
      if (res.success) {
        this.router.navigate(['/home']);
      }
    });
  }
}
