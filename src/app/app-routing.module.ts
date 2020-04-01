import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotfoundComponent, LogoutComponent} from './shared/components';
import {GuestGuard} from './shared/guards/guest.guard';

const routes: Routes = [
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule),
    canActivate: [GuestGuard]
  },
  {
    path: '',
    loadChildren: () => import('./member/member.module').then(m => m.MemberModule),
    canActivate: [MemberGuard]
  },
  {
    path: 'not-found-page',
    component: NotfoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found-page'
  }
];

import {MemberGuard} from './shared/guards/member.guard';


@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {scrollPositionRestoration: 'enabled'},
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
