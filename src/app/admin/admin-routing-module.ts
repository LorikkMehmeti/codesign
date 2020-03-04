import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';


const appRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
        data: {
          breadcrumb: 'Home'
        }
      },
      {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardComponent,
        data: {
          breadcrumb: 'Dashboard'
        }
      },
    ],
    data: {
      breadcrumb: 'Home'
    },
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
export class AdminRoutingModule {
}
