import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

  liked = false;

  constructor(private toast: ToastrService) {
  }

  ngOnInit() {
  }

  toastR() {
    const activeToast = this.toast.error('Congratulations, Your message was sent successfully', 'error', {
      toastClass: 'errori hahah',
    });
    activeToast.toastRef.componentInstance.type = 'error';
    activeToast.toastRef.componentInstance.toastActive = true;
  }

  downloadSomething() {
    const atoast = this.toast.show('Downloading now your files', 'Success');
    atoast.toastRef.componentInstance.type = 'success';

    // setTimeout(() => {
    //   const link = document.createElement('a');
    //   link.download = 'filename';
    //   link.href = 'assets/images/icons8-sad-100.png';
    //   link.click();
    // }, 2000);
  }


}
