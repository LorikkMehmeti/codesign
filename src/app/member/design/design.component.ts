import {Component, HostListener, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {DesignService} from '../../shared/services/design/design.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

  liked = false;
  slug: string;
  design: any;
  isSticky = false;
  lightBoxShowing = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private toast: ToastrService,
              private designService: DesignService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      if (param) {
        this.slug = param.slug;
        if (this.slug) {
          this.getDesignInfo();
        }
      }
    });
  }

  showLightBox() {
    this.lightBoxShowing = !this.lightBoxShowing;
    if (this.lightBoxShowing) {
      document.body.classList.add('events-none');
    } else {
      document.body.classList.remove('events-none');
    }
  }


  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 60;
  }

  getDesignInfo() {
    this.designService.getDesign(this.slug).subscribe((res: any) => {
      this.design = res.data;
      console.log(this.design);
    }, error => {
      this.router.navigate(['not-found-page']);
    });
  }

  downloadFiles() {
    this.toast.show(`Downloading now your files`, 'Success', {
      toastClass: 'warning-toast', timeOut: 1000, extendedTimeOut: 1000
    });

    this.designService.downloadDesign(this.slug).subscribe((res: any) => {
      // Show toast for after the download is completed
      this.toast.show(`Files downloaded successfully`, 'Success', {
        toastClass: 'success-toast'
      });
      const blob: any = new Blob([res], {type: 'octet/stream'});
      fileSaver.saveAs(blob, `${this.slug}.zip`);
    });
  }


}
