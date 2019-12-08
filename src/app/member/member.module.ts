/* Modules */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MemberRoutingModule} from './member-routing-module';

/* Components */
import {MemberComponent} from './member.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from '../shared/components/header/header.component';
// import {SearchComponent} from './search/search.component';
import {GuestModule} from '../guest/guest.module';

@NgModule({
  declarations: [
    MemberComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    GuestModule,
  ]
})
export class MemberModule {
}
