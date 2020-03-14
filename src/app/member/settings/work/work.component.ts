import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/services/user/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TitleService} from '../../../shared/services/title.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  user: any;
  developer = ['Frontend Developer', 'Backend Developer', 'Technician', 'Full Stack Developer', 'UX Developer'];
  designer = ['Frontend Developer', 'Backend Developer', 'Technician', 'Full Stack Developer', 'UX Developer'];

  workStatus = ['Employed', 'Unemployed'];
  work: FormGroup;


  constructor(private title: TitleService, private userService: UserService, private toast: ToastrService) {
  }

  ngOnInit() {
    this.initForm();
    this.getUser();

    this.title.setTitle(`Work Settings`);
  }

  initForm(): void {
    this.work = new FormGroup({
      preferred_job: new FormControl(null, []),
      work_status: new FormControl(null, []),
      work_availability: new FormControl(null, [])
    });
  }

  getUser() {
    this.userService.getAuthUser(true).subscribe((res: any) => {
      this.user = res.data;

      this.updateForm();
    });
  }

  updateForm() {
    const user = this.user;
    if (this.user) {
      this.work.patchValue({
        preferred_job: user.profile.preferred_job,
        work_status: user.profile.work_status,
        work_availability: user.profile.work_availability,
      });
    }
  }

  get preferredJob() {
    return this.work.get('preferred_job');
  }

  get _workStatus() {
    return this.work.get('work_status');
  }

  get work_availability() {
    return this.work.get('work_availability');
  }

  onSubmit() {
    if (this.work.invalid) {
      return;
    }

    const body = {
      preferred_job: this.preferredJob.value,
      work_status: this._workStatus.value,
      work_availability: this.work_availability.value
    };

    this.userService.updateWork(body).subscribe((res: any) => {
      if (res.success) {
        const activeToast = this.toast.show(`${res.message}`, 'Updated', {
          toastClass: 'success_TOAST'
        });
        activeToast.toastRef.componentInstance.type = 'success';
        activeToast.toastRef.componentInstance.toastActive = true;
      }
      if (!res.success) {
        const activeToast = this.toast.show(`Please verify your email before using our platform`, 'Verify email', {
          toastClass: 'success_TOAST'
        });
        activeToast.toastRef.componentInstance.type = 'error';
        activeToast.toastRef.componentInstance.toastActive = true;

      }
    });
  }
}
