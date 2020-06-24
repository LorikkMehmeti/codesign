import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent implements OnInit {

  code: any;
  subscription = new Subscription();
  verified = false;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      if (param) {
        this.code = param.code;

        this.confirm();
      }
    });
  }

  confirm() {
    const endpoint = `${environment.url}/confirmation/${this.code}`;
    this.subscription.add(this.http.get(endpoint).subscribe((res) => {
      this.verified = true;
    }, error => {
      console.log(error);
    }));
  }

}
