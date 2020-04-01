import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {DesignService} from '../../shared/services/design/design.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

  liked = false;
  slug: string;

  constructor(private activatedRoute: ActivatedRoute, private toast: ToastrService, private designService: DesignService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      if (param) {
        this.slug = param.slug;
        console.log(this.slug);
      }
    });
  }

  toastR() {
    const activeToast = this.toast.error('Congratulations, Your message was sent successfully', 'error', {
      toastClass: 'errori hahah'
    });
    activeToast.toastRef.componentInstance.type = 'error';
    activeToast.toastRef.componentInstance.toastActive = true;
  }

  downloadSomething() {
    let atoast = this.toast.show('Downloading now your files', 'Success');
    atoast.toastRef.componentInstance.type = 'success';

    this.designService.downloadDesign(this.slug).subscribe((res: any) => {

      atoast = this.toast.show(`Downloaded successfully, don't forget to like the design`, 'Success');
      atoast.toastRef.componentInstance.type = 'success';
    });

    // setTimeout(() => {
    //   const link = document.createElement('a');
    //   link.download = 'filename';
    //   link.href = 'assets/images/icons8-sad-100.png';
    //   link.click();
    // }, 2000);
  }


}
