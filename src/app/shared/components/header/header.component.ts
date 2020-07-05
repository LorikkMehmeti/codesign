import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user/user.service';
import {Subscription} from 'rxjs';
import {ThemeService} from '../../services/theme.service';
import {MultiLangService} from '../../services/multi-lang.service';

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
  theme: string;
  getLanguage;

  constructor(private multiLang: MultiLangService, private themeService: ThemeService, public authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
    if (this.authenticationService.loggedIn()) {
      this.getLang();
      this.getUser();
      this.getTheme();
    }
  }

  getTheme() {
    this.theme = this.themeService.getTheme();
  }

  getUser() {
    this.sub = this.userService.getAuthUser().subscribe((res: any) => {
      this.user = res.data;
    });
  }


  getLang() {
    this.getLanguage = this.multiLang.getLanguage().toLowerCase();
  }

  setLanguage(lang) {
    this.multiLang.setLanguage(lang);
  }


  switchMode() {
    this.theme = this.themeService.getTheme();
    if (this.theme === 'dark') {
      this.themeService.setTheme('light');
      this.getTheme();
      return;
    }

    this.themeService.setTheme('dark');
    this.getTheme();
  }

}
