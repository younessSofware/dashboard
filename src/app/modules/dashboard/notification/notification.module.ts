import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { ShareModule } from '../../share/share.module';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationDisplayComponent } from './notification-display/notification-display.component';


@NgModule({
  declarations: [
    NotificationComponent,
    NotificationFormComponent,
    NotificationListComponent,
    NotificationDisplayComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    ShareModule,
    TranslateModule
  ]
})
export class NotificationModule { }
