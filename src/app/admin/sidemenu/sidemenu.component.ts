import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  activeTab: string;

  constructor() {
    this.activeTab = 'categories';
  }

  ngOnInit() {
  }


  changeTab(tab: string) {
    this.activeTab = tab;
  }
}
