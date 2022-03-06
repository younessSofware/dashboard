import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from './../share/share.module';
import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    ClientComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShareModule,
    TranslateModule
  ]
})
export class DashboardModule { }
