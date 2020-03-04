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

const appRoutes: Routes = [
  {
    path: '',
    component: MemberComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'design',
        component: DesignComponent
      },
      {
        path: 'profile',
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
