import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthenticationService} from '../services/authentication.service';
import {TokenService} from '../services/token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
              private tokenService: TokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const authService = this.authenticationService;

    if (authService.loggedIn()) {

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${ this.tokenService.getToken() }`
        }
      });
    }

    return next.handle(request);
  }
}
