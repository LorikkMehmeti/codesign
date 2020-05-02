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
  items = [
    {
      id: 1,
      name: 'CHEUKLUN LO | 老焯麟',
      title: 'SNAPCHAT Campaign: Spectacles 3 more text ahaha ha',
      img: 'https://cdn.dribbble.com/users/159597/screenshots/6531694/influencers-dashboard_copy_2x.jpg',
      made: 'adobe-xd'
    },
    {
      id: 2,
      name: 'SAVVY STUDIO',
      title: 'IDENTITY NAINA',
      img: 'https://cdn.dribbble.com/users/159597/screenshots/6520550/learning-dashboard_2x.png',
      made: 'figma'
    },
    {
      id: 3,
      name: '7654321 Studio',
      title: 'Sonnar Library',
      img: 'https://cdn.dribbble.com/users/159597/screenshots/5397525/shot-4_2x.png',
      made: 'figma'
    },
    {
      id: 4,
      name: 'Griselda Martí',
      title: 'Insporta',
      img: 'https://cdn.dribbble.com/users/159597/screenshots/5350288/version-1.png',
      made: 'sketch'
    },
    {
      id: 5,
      name: 'Vikki Zhang',
      title: 'Velado',
      img: 'https://cdn.dribbble.com/users/159597/screenshots/5316582/2-dribbble.png',
      made: 'sketch'
    },
    {
      id: 6,
      name: 'Alexey Kozhenkov',
      title: 'Juno',
      img: 'https://cdn.dribbble.com/users/159597/screenshots/4840566/shot-v3.png',
      made: 'photoshop'
    },
    {
      id: 7,
      name: 'Stranger & Stranger',
      title: 'Sketch Commissions',
      img: 'https://cdn.dribbble.com/users/159597/screenshots/4719555/dribbble.png',
      made: 'photoshop'
    },
    {
      id: 8,
      name: 'Michael George Haddad',
      title: `Don't watch alone`,
      img: 'https://cdn.dribbble.com/users/78433/screenshots/8899419/media/50e2dda578c1897db5f9fe5ecff56a00.png',
      made: 'adobe-xd'
    },
    {
      id: 9,
      name: 'Atipus Barcelona',
      title: 'AYC Riso Summer Zine',
      img: 'https://cdn.dribbble.com/users/696143/screenshots/8902056/media/5d95914f9c6a17d8932cea0f5ec68758.png',
      made: 'sketch'
    },
    {
      id: 10,
      name: 'Multiple Owners',
      title: 'Milked',
      img: 'https://cdn.dribbble.com/users/2020431/screenshots/8903657/media/bae2f1515c9fdb536f9cbb9100348f13.jpg',
      made: 'figma'
    },
    {
      id: 11,
      name: 'Butcher Billy',
      title: 'Bring Art Home',
      img: 'https://cdn.dribbble.com/users/1919778/screenshots/8889011/media/184d43ad576a2d27f52bed5004d688bf.jpg',
      made: 'sketch'
    },
  ];
  toggleTable = -1;
  moreItems = [];
  designs = [];
  auth = this.authenticationService.loggedIn();
  madeWith: string;

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


  constructor(private activatedRoute: ActivatedRoute,
              private title: TitleService,
              private http: HttpClient,
              private designService: DesignService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.title.setTitle(`Home - Codesign`);
    if (!this.auth) {
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
        setTimeout(() => {
          this.getDesigns(param.params);
          this.selected.made = this.tools.find(data => (data.query.toLowerCase() === param.params.made));
          this.labels.madeWith = this.selected.made.name;
        }, 1000);
        return;
      }

      setTimeout(() => {
        this.getDesigns();
        this.moreItems = this.items.sort(() => Math.random() - 0.5);
      }, 1000);
    });
  }

  infiniteScroll() {
    if (this.currentPage < this.lastPage) {
      this._loaderShow = true;
      this.getDesigns();
      this.currentPage++;
    }
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
