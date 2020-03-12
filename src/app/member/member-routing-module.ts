import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MemberComponent} from './member.component';
import {HomeComponent} from './home/home.component';
import {DesignComponent} from './design/design.component';
import {ProfileComponent} from './profile/profile.component';
import {SearchComponent} from './search/search.component';
import {UploadComponent} from './posts/upload/upload.component';
import {EditComponent} from './posts/edit/edit.component';
import {AccountConfirmationComponent} from './account-confirmation/account-confirmation.component';
import {SettingsComponent} from './settings/settings.component';
import {SettingsprofileComponent} from './settings/settingsprofile/settingsprofile.component';
import {WorkComponent} from './settings/work/work.component';
import {AccountSettingsComponent} from './settings/account-settings/account-settings.component';
import {PasswordComponent} from './settings/password/password.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MemberComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'design',
        component: DesignComponent
      },
      {
        path: 'us/:username',
        component: ProfileComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'post/create',
        component: UploadComponent
      },
      {
        path: 'post/edit',
        component: EditComponent
      },
      {
        path: 'account-confirmation',
        component: AccountConfirmationComponent
      },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          {path: 'account', component: SettingsprofileComponent},
          {path: 'work', component: WorkComponent},
          {path: 'password', component: PasswordComponent},
          {path: 'account-settings', component: AccountSettingsComponent},
          {path: 'social', component: SettingsComponent},
        ],
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
export class MemberRoutingModule {
}
