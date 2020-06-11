import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../shared/services/user/user.service';
import {TitleService} from '../../shared/services/title.service';
import {DesignService} from '../../shared/services/design/design.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

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

  designs: any;

  username: string;
  user: any;
  userExists = true;
  userLoading = true;
  deleteId: any;

  constructor(private title: TitleService,
              private activatedRoute: ActivatedRoute,
              private toast: ToastrService,
              private designService: DesignService,
              private translate: TranslateService,
              public ngxSmartModalService: NgxSmartModalService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.user = undefined;
      this.userLoading = true;
      this.username = param.username;
      if (this.username) {
        this.getUserFromUsername(this.username);
      }
    });
  }

  getUserFromUsername(username) {
    this.userService.getUserFromUsername(username).subscribe((res: any) => {
      this.userLoading = false;
      if (res.success) {
        this.user = res.data;
        const user = this.user;
        this.userExists = true;
        this.designs = res.data.designs;
        this.title.setTitle(`${user.first_name} ${user.last_name} - Codesign`);
      }

      if (!res.success) {
        this.userExists = false;
        // this.router.navigate(['/not-found-page']);
      }
    });
  }

  deleteDesign(id) {
    this.ngxSmartModalService.getModal('myModal').close();
    this.designService.deleteDesign(id).subscribe(() => {
      this.toast.show(`${this.translate.instant('messages.deletedProject')}`, 'Success', {
        toastClass: 'success-toast'
      });
      this.designs = this.designs.filter(design => design.id !== id);
    });
  }

  openDeleteModal(id) {
    this.deleteId = id;
    this.ngxSmartModalService.getModal('myModal').open();
  }

}
