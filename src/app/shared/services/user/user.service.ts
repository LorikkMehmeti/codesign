import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {withCache} from '@ngneat/cashew';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = `${environment.url}`;

  constructor(private http: HttpClient) {
  }

  registerUser(body) {

    const endpoint = `${this.endpoint}/register`;

    return this.http.post(endpoint, body);

  }

  getAuthUser(includeProfile?: boolean) {
    const endpoint = `${this.endpoint}/details` + (includeProfile ? '?profile=true' : '');

    return this.http.get(endpoint);
  }

  updateInfo(body) {
    const endpoint = `${this.endpoint}/update`;
    return this.http.put(endpoint, body);
  }

  updatePassword(body) {
    const endpoint = `${this.endpoint}/update-password`;

    return this.http.post(endpoint, body);
  }

  updateWork(body) {
    const endpoint = `${this.endpoint}/update-work`;

    return this.http.put(endpoint, body);
  }

  getUserFromUsername(username) {
    const endpoint = `${this.endpoint}/profile/${username}`;

    return this.http.get(endpoint);
  }

  isVerified() {
    const endpoint = `${this.endpoint}/details`;
    this.getAuthUser().subscribe((res: any) => {
      const email = res.data.email_verified_at;
      return email;
    });
  }
}
