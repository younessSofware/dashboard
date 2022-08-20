import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from '../../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventDisplayComponent } from './event-display/event-display.component';
import { EventFormComponent } from './event-form/event-form.component';


@NgModule({
  declarations: [
    EventListComponent,
    EventDisplayComponent,
    EventFormComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    ShareModule,
    TranslateModule
  ]
})
export class EventModule { }
