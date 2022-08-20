import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from './../share/share.module';
import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/eventcomponent';
import { ArticleComponent } from './article/article.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    EventComponent,
    HomeComponent,
    ArticleComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShareModule,
    TranslateModule
  ]
})
export class DashboardModule { }
