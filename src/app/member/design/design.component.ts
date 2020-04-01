import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {DesignService} from '../../shared/services/design/design.service';
import {ActivatedRoute} from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private toast: ToastrService, private designService: DesignService) {
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

  getDesignInfo() {
    this.designService.getDesign(this.slug).subscribe((res: any) => {
      this.design = res.data;
      console.log(this.design);
    });
  }

  downloadFiles() {
    let toastConfirm = this.toast.show('Downloading now your files', 'Success');
    toastConfirm.toastRef.componentInstance.type = 'success';

    this.designService.downloadDesign(this.slug).subscribe((res: any) => {
      // Show toast for after the download is completed
      toastConfirm = this.toast.show(`Downloaded successfully, don't forget to like the design`, 'Success');
      toastConfirm.toastRef.componentInstance.type = 'success';

      const blob: any = new Blob([res], { type: 'octet/stream' });
      fileSaver.saveAs(blob, `${this.slug}.zip`);
    });
  }


}
