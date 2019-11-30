import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'svg-icon',
  templateUrl: './svgicon.component.html',
  styleUrls: ['./svgicon.component.scss']
})
export class SvgIconComponent implements OnInit {
  /**
   * @Input() size, size of div containing the svg file, you can change the value when you call the component
   */
  @Input() size = 28;

  /**
   * @Input() fillColor, the color of svg, is optional
   */
  @Input() fillColor?: string;

  /**
   * @Input() className, define class for svg, is optional
   */
  @Input() className?: string;

  /**
   * @Input() idName, define an unique id for svg, is optional
   */
  @Input() idName?: string;

  /**
   * @Input() icon, icon name that we want to use, is required
   */
  @Input() icon: string;

  /**
   * @Input() fileName, svg file for the icon we using, this is required when icons are grouped in files (modules)
   */
  @Input() fileName: string;

  constructor() {
  }

  ngOnInit() {
  }

}
