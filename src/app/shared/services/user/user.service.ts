import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

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

  getAuthUser() {
    const endpoint = `${this.endpoint}/details`;

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
}
