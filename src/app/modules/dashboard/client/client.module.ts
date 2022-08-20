import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from './../../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDisplayComponent } from './client-display/client-display.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientComponent } from './client.component';


@NgModule({
  declarations: [
    ClientListComponent,
    ClientDisplayComponent,
    ClientFormComponent,
    ClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ShareModule,
    TranslateModule
  ]
})
export class ClientModule { }
