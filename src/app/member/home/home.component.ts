import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {TitleService} from '../../shared/services/title.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DesignService} from '../../shared/services/design/design.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  classColumns = true;
  toggleTable = -1;
  moreItems = [];
  designs = [];
  auth = this.authenticationService.loggedIn();
  madeWith: string;
  newDesigns: any;

  tools = [
    {name: 'Adobe XD', query: 'adobe-xd', icon: 'adobe-xd'},
    {name: 'Figma', query: 'figma', icon: 'figma'},
    {name: 'Sketch', query: 'sketch', icon: 'sketch'},
    {name: 'Photoshop', query: 'photoshop', icon: 'photoshop'},
    {name: 'Other tools', query: 'other', icon: 'rgb'},
  ];

  labels: any = {};

  sortByArr = [{name: 'Relevant', query: 'relevant'}, {name: 'Most Appreciated', query: 'most-appreciated'}, {
    name: 'Most Downloaded',
    query: 'most-downloaded'
  }];

  selected: any = {};
  dataAvailable = false;

  currentPage = 1;
  getPage = 1;
  lastPage;
  // tslint:disable-next-line:variable-name
  _loaderShow = false;
  randomDesigns: any;


  constructor(private activatedRoute: ActivatedRoute,
              private title: TitleService,
              private http: HttpClient,
              private designService: DesignService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.title.setTitle(`Home - Codesign`);
    if (!this.auth) {
      this.getGuestDesigns();
      return;
    }


    this.activatedRoute.queryParamMap.subscribe((param: any) => {
      this.dataAvailable = false;
      this.designs = [];
      this.labels = {};
      this.selected = {};
      this.getPage = 1;

      if (param.params.sort) {
        this.selected.sort = this.sortByArr.find(data => data.query.toLowerCase() === param.params.sort);
        this.labels.sortBy = this.selected.sort.name;
      }

      if (param.keys.length > 0 && param.params.made) {
        this.getDesigns(param.params);
        this.selected.made = this.tools.find(data => (data.query.toLowerCase() === param.params.made));
        this.labels.madeWith = this.selected.made.name;
        return;
      }

      this.getDesigns();
    });
  }

  infiniteScroll() {
    if (this.currentPage < this.lastPage) {
      this._loaderShow = true;
      this.getDesigns();
      this.currentPage++;
    }
  }

  getGuestDesigns() {
    this.designService.getGuestDesigns().subscribe((res: any) => {
      this.newDesigns = res[0].data;
      this.randomDesigns = res[1].data;
    });
  }

  getDesigns(params?: any) {
    this.designService.getListOfDesigns(params, this.getPage).subscribe((res: any) => {
      if (res.success) {
        this._loaderShow = false;
        this.currentPage = res.data.current_page;
        this.lastPage = res.data.last_page;
        for (const element of res.data.data) {
          this.designs.push(element);
        }
        if (res.data.data.length === 0) {
          this.dataAvailable = true;
        }
        this.getPage++;
        return;
      }

      this.dataAvailable = false;
    });
  }

  toggleColumns(type) {
    this.classColumns = type;
  }

  onToggleTable(index: number) {
    this.toggleTable = this.toggleTable === index ? -1 : index;
  }

  onScroll() {
    console.log('scrolled');
  }
}
