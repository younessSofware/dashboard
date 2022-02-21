import { ShareModule } from './../../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductDisplayComponent } from './product-display/product-display.component';


@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductFormComponent,
    ProductDisplayComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ShareModule
  ]
})
export class ProductModule { }
