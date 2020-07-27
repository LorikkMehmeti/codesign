import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {withCache} from '@ngneat/cashew';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignService {
  endpoint = `${environment.url}`;

  constructor(private http: HttpClient) {
  }


  createDesign(body) {
    const endpoint = `${this.endpoint}/design/create`;
    return this.http.post(endpoint, body);
  }

  getListOfDesigns(params?: any, page = 1) {
    const endpoint = `${this.endpoint}/get-all/designs?page=${page}`;
    return this.http.get(endpoint, {params});
  }

  getGuestDesigns() {
    const endpoint = `${this.endpoint}/designs/`;

    const response1 = this.http.get(endpoint + 'new');
    const response2 = this.http.get(endpoint + 'random');
    const response3 = this.http.get(endpoint + 'most-viewed');

    return forkJoin([response1, response2, response3]);
  }

  getDesign(slug) {
    const endpoint = `${this.endpoint}/design/${slug}`;

    return this.http.get(endpoint);
  }

  seen(slug) {
    const endpoint = `${this.endpoint}/seen/${slug}`;

    return this.http.get(endpoint);
  }

  deleteDesign(id) {
    const endpoint = `${this.endpoint}/design/${id}`;

    return this.http.delete(endpoint);
  }

  downloadDesign(design: string) {
    const endpoint = `${this.endpoint}/download/${design}`;

    return this.http.get(endpoint, {responseType: 'blob'});
  }
}
