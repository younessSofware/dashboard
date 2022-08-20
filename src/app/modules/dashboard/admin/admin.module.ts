import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminDisplayComponent } from './admin-display/admin-display.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { ShareModule } from '../../share/share.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AdminComponent,
    AdminListComponent,
    AdminDisplayComponent,
    AdminFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ShareModule,
    TranslateModule
  ]
})
export class AdminModule { }
