import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cd-button',
  templateUrl: './cdbutton.component.html',
  styleUrls: ['./cdbutton.component.scss']
})
export class CdbuttonComponent implements OnInit {
  @Input() showIcon ?= true;
  @Input() classNames = 'cd-btn-inline cd-btn-light';
  @Input() fileSvg?: string;
  @Input() iconSvg?: string;
  @Input() textBtn ?= true;
  @Input() text = 'Button name';
  @Input() iconName ?= 'cloud';


  constructor() {
  }

  ngOnInit() {
  }

}
