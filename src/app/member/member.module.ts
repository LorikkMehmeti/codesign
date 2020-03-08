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
import { DesignComponent } from './design/design.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { UploadComponent } from './posts/upload/upload.component';
import { EditComponent } from './posts/edit/edit.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SkeletonComponent} from '../shared/components';
import { AccountConfirmationComponent } from './account-confirmation/account-confirmation.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsprofileComponent } from './settings/settingsprofile/settingsprofile.component';
import {TranslateModule} from '@ngx-translate/core';
import { WorkComponent } from './settings/work/work.component';
import { AccountSettingsComponent } from './settings/account-settings/account-settings.component';
import { PasswordComponent } from './settings/password/password.component';

@NgModule({
  declarations: [
    MemberComponent,
    HomeComponent,
    DesignComponent,
    ProfileComponent,
    SearchComponent,
    UploadComponent,
    EditComponent,
    SkeletonComponent,
    AccountConfirmationComponent,
    SettingsComponent,
    SettingsprofileComponent,
    WorkComponent,
    AccountSettingsComponent,
    PasswordComponent,
  ],
    imports: [
        CommonModule,
        MemberRoutingModule,
        GuestModule,
        NgxDropzoneModule,
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule,
        TranslateModule,
    ]
})
export class MemberModule {
}
