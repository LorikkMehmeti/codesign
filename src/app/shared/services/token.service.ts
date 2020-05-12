import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private jwtHelper = new JwtHelperService();

  constructor(private router: Router, private cookieService: CookieService, private http: HttpClient) {
    this.getUserFromToken();
  }

  getUserFromToken() {
    return this.http.get(`${environment.url}/details`);
  }

  /**
   *
   * @returns role from token.
   */
  // getRoleFromToken(): string | null {
  //   const roles = this.getUserFromToken()['authorities'];
  //
  //   if (!roles) {
  //     return null;
  //   }
  //
  //   if (roles.indexOf(ROLE.ADMIN) > -1) {
  //     return ROLE.ADMIN;
  //   } else if (roles.indexOf(ROLE.MODERATOR) > -1) {
  //     return ROLE.MODERATOR;
  //   }
  //
  //   return ROLE.USER;
  // }

  /**
   *
   * @param token as any
   */
  setToken(token: string): void {
    const getToken: any = this.jwtHelper.decodeToken(token);
    const expires = new Date().getDate();
    const expDate = new Date(getToken.exp).getDate();
    // @ts-ignore
    this.cookieService.set('token', token, '', '/', `${environment.whoIsHosting}`);
  }

  /**
   *
   * @returns string  as any
   */
  getToken(): string {
    const token = this.cookieService.get('token');
    if (token && this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/logout']);
      return;
    }
    return this.cookieService.get('token');
  }

  /**
   * delete token.
   */
  deleteToken(): void {
    this.cookieService.delete('token', '/', `${environment.whoIsHosting}`);
    this.cookieService.deleteAll('/', '/');
  }
}
