import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from './../../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderDisplayComponent } from './order-display/order-display.component';


@NgModule({
  declarations: [
    OrderComponent,
    OrderDisplayComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ShareModule,
    TranslateModule
  ]
})
export class OrderModule { }
