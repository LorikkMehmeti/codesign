import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GuestComponent} from './guest.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {GuestRoutingModule} from './guest-routing.module';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ConfirmRegistrationComponent} from './confirm-registration/confirm-registration.component';
import {CdbuttonComponent, SvgIconComponent} from '../shared/components';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ConfirmRegistrationComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    CdbuttonComponent,
    SvgIconComponent,
    GuestComponent
  ],
  exports: [CdbuttonComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    TranslateModule,
  ]
})
export class GuestModule {
}
