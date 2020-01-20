import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() marginHeader = false;
  @Input() borderBottom = false;
  switch = false;

  constructor() { }

  ngOnInit() {
  }


  switchMode() {
    const theme = document.body.getAttribute('data-theme');
    this.switch = !this.switch;
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'light');
      return;
    }
    document.body.setAttribute('data-theme', 'dark');
  }

}
