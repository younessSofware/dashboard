import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from './../../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdRoutingModule } from './ad-routing.module';
import { AdListComponent } from './ad-list/ad-list.component';
import { AdComponent } from './ad.component';
import { AdFormComponent } from './ad-form/ad-form.component';


@NgModule({
  declarations: [
    AdListComponent,
    AdComponent,
    AdFormComponent
  ],
  imports: [
    CommonModule,
    AdRoutingModule,
    ShareModule,
    TranslateModule
  ]
})
export class AdModule { }
