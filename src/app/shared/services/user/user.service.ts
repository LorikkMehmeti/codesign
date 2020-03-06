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
}
