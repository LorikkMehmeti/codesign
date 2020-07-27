import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {TitleService} from '../../shared/services/title.service';
import {ActivatedRoute, Router} from '@angular/router';
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

  sortByArr = [
    {name: 'Relevant', query: 'asc', translate: 'filters.sortBy.relevant'},
    {name: 'Most Viewed', query: 'desc', translate: 'filters.sortBy.mostViewed'},
  ];

  selected: any = {};
  dataAvailable = false;

  currentPage = 1;
  getPage = 1;
  lastPage;
  // tslint:disable-next-line:variable-name
  _loaderShow = false;
  randomDesigns: any;
  mostViewedDesigns: any;
  params: any;


  constructor(private activatedRoute: ActivatedRoute,
              private title: TitleService,
              private http: HttpClient,
              private router: Router,
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
      this.params = param.params;

      if (param.params) {
        if (param.params.sortBy) {
          this.selected.sortBy = this.sortByArr.find(data => data.query.toLowerCase() === param.params.sortBy);
          this.labels.sortBy = this.selected.sortBy.translate;
        }

        if (param.keys.length > 0 && param.params.made) {
          this.selected.made = this.tools.find(data => (data.query.toLowerCase() === param.params.made));
          this.labels.madeWith = this.selected.made.name;
        }

        this.getDesigns(param.params);
        return;
      }

      this.getDesigns();
    });
  }

  trackByFn(index) {
    return index;
  }

  removeParam(yourParamName?: string) {
    switch (yourParamName) {
      case 'made':
        this.router.navigate(['.'], {
          relativeTo: this.activatedRoute,
          queryParams: { made: null, youCanRemoveMultiple: null },
          queryParamsHandling: 'merge'
        });
        break;
      case 'sortBy':
        this.router.navigate(['.'], {
          relativeTo: this.activatedRoute,
          queryParams: { sortBy: null, youCanRemoveMultiple: null },
          queryParamsHandling: 'merge'
        });
        break;
    }

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
      this.mostViewedDesigns = res[2].data;
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
