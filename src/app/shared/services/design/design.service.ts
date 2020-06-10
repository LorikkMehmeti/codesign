import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {withCache} from '@ngneat/cashew';

@Injectable({
  providedIn: 'root'
})
export class DesignService {
  endpoint = `${environment.url}`;

  constructor(private http: HttpClient) {
  }


  createDesign(body) {
    const endpoint = `${this.endpoint}/design/create`;
    return this.http.post(endpoint, body, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

        switch (event.type) {

          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return {status: 'progress', message: progress};

          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    );
  }

  getListOfDesigns(params?: any, page = 1) {
    const endpoint = `${this.endpoint}/get-all/designs?page=${page}`;
    return this.http.get(endpoint, {params});
  }

  getDesign(slug) {
    const endpoint = `${this.endpoint}/design/${slug}`;

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
