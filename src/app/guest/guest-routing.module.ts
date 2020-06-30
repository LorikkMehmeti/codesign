import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuestComponent} from './guest.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ConfirmRegistrationComponent} from './confirm-registration/confirm-registration.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ResendComponent} from './resend/resend.component';

const appRoutes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: SignupComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'reset-password/:code',
        component: ResetPasswordComponent
      },
      {
        path: 'confirm-registration/:code',
        component: ConfirmRegistrationComponent
      },
      {
        path: 'resend',
        component: ResendComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class GuestRoutingModule {
}
