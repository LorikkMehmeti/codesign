import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user/user.service';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.scss']
})
export class AccountConfirmationComponent implements OnInit {

  user: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getAuthUser().subscribe((res: any) => {
      this.user = res.data;
    });
  }

}
