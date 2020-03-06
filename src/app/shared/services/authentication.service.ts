import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {TokenService} from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  helper = new JwtHelperService();
  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  login(userName: string, pass: string) {
    const authorizationData = 'Basic ' + btoa('first-client' + ':' + 'first-secret');

    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: authorizationData
      })
    };

    const body = {
      username: userName,
      password: pass
    };


    // const body = new HttpParams()
    //   .set('username', userName)
    //   .set('password', pass);

    console.log(body);
    const url = `${environment.url}/login`;
    return this.http.post<any>(url, body, headerOptions)
      .pipe(map((res: any) => {
        if (res.success === false) {
          return res;
        }

        this.tokenService.setToken(res.access_token);

        return res;
      }));
  }

  getUser() {
    return this.http.get(`${environment.url}/details`);
  }

  loggedIn() {
    const token = this.tokenService.getToken();
    return !!token;
  }
}
