import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getAuthUser().subscribe((res: any) => {
      this.user = res.data;
    });
  }

}
