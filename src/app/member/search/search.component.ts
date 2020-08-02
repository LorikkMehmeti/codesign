import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {DesignService} from '../../shared/services/design/design.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  sub: Subscription;
  data: any;
  query: string;

  constructor(private activatedRoute: ActivatedRoute, private designService: DesignService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((param) => {
      if (param.q) {
        this.query = param.q;
        const q = this.query;
        if (q) {
          this.search(q);
        }
      }

    });
 }

 search(query) {
   this.sub = this.designService.search(query).subscribe((res: any) => {
     this.data = res.data;
     console.log(this.data);
   });
 }

}
