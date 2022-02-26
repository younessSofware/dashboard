import { ShareModule } from './../../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryManRoutingModule } from './delivery-man-routing.module';
import { DeliveryManComponent } from './delivery-man.component';
import { DeliveryManListComponent } from './delivery-man-list/delivery-man-list.component';
import { DeliveryManFormComponent } from './delivery-man-form/delivery-man-form.component';
import { DeliveryManDisplayComponent } from './delivery-man-display/delivery-man-display.component';


@NgModule({
  declarations: [
    DeliveryManComponent,
    DeliveryManListComponent,
    DeliveryManFormComponent,
    DeliveryManDisplayComponent
  ],
  imports: [
    CommonModule,
    DeliveryManRoutingModule,
    ShareModule
  ]
})
export class DeliveryManModule { }
