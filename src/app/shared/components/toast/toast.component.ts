import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {Component, HostBinding, Input, OnInit} from '@angular/core';

import {Toast, ToastrService, ToastPackage} from 'ngx-toastr';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        transform: 'translateY(70px)',
        opacity: 0
      })),
      transition('inactive => active', animate('400ms ease-out', keyframes([
        style({
          opacity: 0,
          transform: 'translateY(70px)'
        }),
        style({
          opacity: 1,
          transform: 'translateY(0px)'
        })
      ]))),
      transition('active => removed', animate('400ms ease-out', keyframes([
        style({
          opacity: 1,
          transform: 'translateY(70px)'
        }),
        style({
          transform: 'translateY(0px)',
          opacity: 0,
        }),
      ]))),
    ]),
  ]
})
export class ToastComponent extends Toast implements OnInit {
  @Input() type: string;
  @Input() toastActive = false;

  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
  ) {
    super(toastrService, toastPackage);
  }


  ngOnInit() {
  }

}
