import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {TokenService} from '../services/token.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserService} from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate {

  user: any;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private http: HttpClient,
              private userService: UserService,
              private tokenService: TokenService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // if (next._routerState.url.indexOf('/home') !== -1) {
    //   return true;
    // }


    /* TODO change this or do better */
    // @ts-ignore
    if (next._routerState.url.indexOf('home') !== -1 || next._routerState.url.indexOf('profile') !== -1) {
      return true;
    }

    const loggedIn = this.authenticationService.loggedIn();
    if (!loggedIn) {
      this.router.navigate(['/login']);
      return true;
    }

    return true;
  }

}
