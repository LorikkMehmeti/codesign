import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../shared/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  classColumns = true;
  items = [
    {
      id: 1,
      name: 'CHEUKLUN LO | 老焯麟',
      title: 'ValueBet',
      img: 'https://cdn.dribbble.com/users/203446/screenshots/8373289/media/91a68dd9ac508bfeb8dbed88077cd4a2.png'
    },
    {
      id: 2,
      name: 'SAVVY STUDIO',
      title: 'IDENTITY NAINA',
      img: 'https://cdn.dribbble.com/users/1559475/screenshots/6875797/shoot_5_2x.png'
    },
    {
      id: 3,
      name: '7654321 Studio',
      title: 'Sonnar Library',
      img: 'https://cdn.dribbble.com/users/179502/screenshots/7159670/media/356488743b9c5c8596670915a9d40d97.jpg'
    },
    {
      id: 4,
      name: 'Griselda Martí',
      title: 'Insporta',
      img: 'https://cdn.dribbble.com/users/1035801/screenshots/5295895/_011__dribbble_2x.jpg'
    },
    {
      id: 5,
      name: 'Vikki Zhang',
      title: 'Velado',
      img: 'https://cdn.dribbble.com/users/844462/screenshots/6679166/dribbble_-_form_2x_2x.png'
    },
    {
      id: 6,
      name: 'Alexey Kozhenkov',
      title: 'Juno',
      img: 'https://cdn.dribbble.com/users/912310/screenshots/6338984/instalinks__dashboard__dark_2_2x.png'
    },
    {
      id: 7,
      name: 'Stranger & Stranger',
      title: 'Sketch Commissions',
      img: 'https://cdn.dribbble.com/users/1121400/screenshots/6900845/layers_2x.png'
    },
    {
      id: 8,
      name: 'Michael George Haddad',
      title: 'Don`t watch alone',
      img: 'https://cdn.dribbble.com/users/225194/screenshots/7351492/media/9f865ae87c32536977119aae9cb2d706.png'
    },
    {
      id: 9,
      name: 'Atipus Barcelona',
      title: 'AYC Riso Summer Zine',
      img: 'https://cdn.dribbble.com/users/2472186/screenshots/6807866/communities.png'
    },
    {
      id: 10,
      name: 'Multiple Owners',
      title: 'Milked',
      img: 'https://cdn.dribbble.com/users/551602/screenshots/6934192/vue-lesson-dribbble_2x.png'
    },
    {
      id: 11,
      name: 'Butcher Billy',
      title: 'Bring Art Home',
      img: 'https://cdn.dribbble.com/users/821812/screenshots/5126425/bigbinary-series-shot3_2x.png'
    },
  ];

  username: string;
  user: any;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.user = undefined;
      this.username = param.username;
      if (this.username) {
        this.getUserFromUsername(this.username);
      }
    });
  }

  getUserFromUsername(username) {
    this.userService.getUserFromUsername(username).subscribe((res: any) => {
      if (res.success) {
        this.user = res.data;
      }

      if (!res.success) {
        this.router.navigate(['/not-found-page']);
      }
    });
  }

}
