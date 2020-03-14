import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {TitleService} from '../../shared/services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  classColumns = false;
  items = [
    {
      id: 1,
      name: 'CHEUKLUN LO | 老焯麟',
      title: 'SNAPCHAT Campaign: Spectacles 3 more text ahaha ha',
      img: 'https://cdn.dribbble.com/users/159597/screenshots/6531694/influencers-dashboard_copy_2x.jpg'
    },
    {
      id: 2,
      name: 'SAVVY STUDIO',
      title: 'IDENTITY NAINA',
      img: 'https://cdn.dribbble.com/users/159597/screenshots/6520550/learning-dashboard_2x.png'
    },
    {
      id: 3,
      name: '7654321 Studio',
      title: 'Sonnar Library',
      img: 'https://cdn.dribbble.com/users/159597/screenshots/5397525/shot-4_2x.png'
    },
    {
      id: 4,
      name: 'Griselda Martí',
      title: 'Insporta',
      img: 'https://cdn.dribbble.com/users/159597/screenshots/5350288/version-1.png'
    },
    {
      id: 5,
      name: 'Vikki Zhang',
      title: 'Velado',
      img: 'https://cdn.dribbble.com/users/159597/screenshots/5316582/2-dribbble.png'
    },
    {
      id: 6,
      name: 'Alexey Kozhenkov',
      title: 'Juno',
      img: 'https://cdn.dribbble.com/users/159597/screenshots/4840566/shot-v3.png'
    },
    {
      id: 7,
      name: 'Stranger & Stranger',
      title: 'Sketch Commissions',
      img: 'https://cdn.dribbble.com/users/159597/screenshots/4719555/dribbble.png'
    },
    {
      id: 8,
      name: 'Michael George Haddad',
      title: 'Don`t watch alone',
      img: 'https://cdn.dribbble.com/users/78433/screenshots/8899419/media/50e2dda578c1897db5f9fe5ecff56a00.png'
    },
    {
      id: 9,
      name: 'Atipus Barcelona',
      title: 'AYC Riso Summer Zine',
      img: 'https://cdn.dribbble.com/users/696143/screenshots/8902056/media/5d95914f9c6a17d8932cea0f5ec68758.png'
    },
    {
      id: 10,
      name: 'Multiple Owners',
      title: 'Milked',
      img: 'https://cdn.dribbble.com/users/2020431/screenshots/8903657/media/bae2f1515c9fdb536f9cbb9100348f13.jpg'
    },
    {
      id: 11,
      name: 'Butcher Billy',
      title: 'Bring Art Home',
      img: 'https://cdn.dribbble.com/users/1919778/screenshots/8889011/media/184d43ad576a2d27f52bed5004d688bf.jpg'
    },
  ];
  toggleTable = -1;
  moreItems = [];
  auth = this.authenticationService.loggedIn();


  constructor(private title: TitleService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.title.setTitle(`Home - Codesign`);
    if (!this.auth) {
      return;
    }
    setTimeout(() => {
      this.moreItems = this.items.sort(() => Math.random() - 0.5);
    }, 3000);
  }

  toggleColumns(type) {
    this.classColumns = type;
  }

  onToggleTable(index: number) {
    this.toggleTable = this.toggleTable === index ? -1 : index;
  }
}
