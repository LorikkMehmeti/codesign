import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit, AfterViewInit {

  constructor(private tokenService: TokenService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.onLogout();
  }

  ngAfterViewInit(): void {
  }

  private onLogout(): void {
    const url = `${environment.url}/logout`;
    const getToken = this.tokenService.getToken();
    if (getToken) {
      this.http.post(url, '').subscribe(res => {
        this.tokenService.deleteToken();
        this.router.navigate(['/home']);
      });

      return;
    }

    this.router.navigate(['/home']);
  }

}
