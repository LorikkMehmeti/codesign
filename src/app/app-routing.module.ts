import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotfoundComponent} from './shared/components';


const routes: Routes = [
  {
    path: '',
    loadChildren: './guest/guest.module#GuestModule',
    // canActivate: [GuestGuard]
  },
  {
    path: '',
    loadChildren: './member/member.module#MemberModule',
    // canActivate: [MemberGuard]
  },
  // {
  //   path: 'logout',
  //   component: LogoutComponent
  // },
  {
    path: '**',
    component: NotfoundComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
