import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {TokenService} from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private tokenService: TokenService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // @ts-ignore
    if (next.url.indexOf('home') !== -1 || next.url.indexOf('confirm-registration') !== -1) {
      return true;
    }
    const loggedIn = this.authenticationService.loggedIn();
    if (loggedIn) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }


}
