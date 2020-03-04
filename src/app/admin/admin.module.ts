/* Modules */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {ReactiveFormsModule, FormsModule} from '@angular/forms';
// import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SkeletonComponent} from '../shared/components';
import {AdminRoutingModule} from './admin-routing-module';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    SidemenuComponent,
    // SkeletonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule {
}
