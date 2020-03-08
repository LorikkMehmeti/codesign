import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user/user.service';
import {Subscription} from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() marginHeader = false;
  @Input() borderBottom = false;
  switch = false;
  showMenu = false;
  sub: Subscription;
  user: any;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
    if (this.authenticationService.loggedIn()) {
      this.getUser();
    }
  }

  getUser() {
    this.sub = this.userService.getAuthUser().subscribe((res: any) => {
      this.user = res.data;
    });
  }


  switchMode() {
    const theme = document.body.getAttribute('data-theme');
    this.switch = !this.switch;
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'light');
      return;
    }
    document.body.setAttribute('data-theme', 'dark');
  }

}
