import { ShareModule } from './../../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreFormComponent } from './store-form/store-form.component';
import { StoreDisplayComponent } from './store-display/store-display.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    StoreComponent,
    StoreListComponent,
    StoreFormComponent,
    StoreDisplayComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ShareModule,
    NgApexchartsModule
  ]
})
export class StoreModule { }
