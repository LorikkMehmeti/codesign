import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {TokenService} from '../services/token.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate {

  user: any;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private http: HttpClient,
              private tokenService: TokenService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log(next);

    /* TODO change this or do better */
    // @ts-ignore
    if (next.url.indexOf('home') !== -1 || next.url.indexOf('profile' !== -1)) {
      return true;
    }
    // if (next._routerState.url.indexOf('/home') !== -1) {
    //   return true;
    // }

    this.http.get(`${environment.url}/details`).subscribe((res: any) => {
      this.user = res.data;
      const email =  this.user.email_verified_at;
      if (email === null || email === '' || email === undefined) {
        this.router.navigate(['/account-confirmation']);
        return true;
      }
      // @ts-ignore
      if (next._routerState.url.indexOf('/account-confirmation') && email === null) {
        this.router.navigate(['/home']);
      }
    });



    const loggedIn = this.authenticationService.loggedIn();
    if (!loggedIn) {
      this.router.navigate(['/login']);
      return true;
    }

    return true;
  }

}
