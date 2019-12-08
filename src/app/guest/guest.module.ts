import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GuestComponent} from './guest.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {GuestRoutingModule} from './guest-routing.module';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ConfirmRegistrationComponent} from './confirm-registration/confirm-registration.component';
import {CdbuttonComponent, SvgIconComponent, FooterComponent, HeaderComponent} from '../shared/components';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ConfirmRegistrationComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    CdbuttonComponent,
    FooterComponent,
    HeaderComponent,
    SvgIconComponent,
    GuestComponent
  ],
  exports: [CdbuttonComponent, HeaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GuestRoutingModule,
    TranslateModule,
  ]
})
export class GuestModule {
}
