import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: './guest/guest.module#GuestModule'
    // canActivate: [GuestGuard]
  },
  // {
  //   path: 'account',
  //   loadChildren: './account/account.module#AccountModule'
  //   // canActivate: [AccountGuard]
  // },
  // {
  //   path: 'member',
  //   loadChildren: './member/member.module#MemberModule'
  //   // canActivate: [MemberGuard]
  // }
  // {
  //   path: 'logout',
  //   component: LogoutComponent
  // },
  // {
  //   path: '**',
  //   component: NotFoundComponent
  // }
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
