import { NgApexchartsModule } from 'ng-apexcharts';
import { ShareModule } from './../../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDisplayComponent } from './client-display/client-display.component';
import { ClientFormComponent } from './client-form/client-form.component';


@NgModule({
  declarations: [
    ClientListComponent,
    ClientDisplayComponent,
    ClientFormComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ShareModule,
    NgApexchartsModule
  ]
})
export class ClientModule { }
