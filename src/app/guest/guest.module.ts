import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GuestComponent} from './guest.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {GuestRoutingModule} from './guest-routing.module';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ConfirmRegistrationComponent} from './confirm-registration/confirm-registration.component';
import {CdbuttonComponent} from '../shared/components';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ConfirmRegistrationComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    CdbuttonComponent,
    GuestComponent
  ],
  exports: [CdbuttonComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
  ]
})
export class GuestModule {
}
